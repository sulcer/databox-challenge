import { Injectable } from '@nestjs/common';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';
import { DataboxService } from '@app/modules/databox/databox.service';
import { OrderbookEntry } from '@app/modules/data-fetching/interface/data.fetching.interface';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MetricsService {
  private readonly cryptoSymbol: string = 'BTC/USD';
  private readonly stockSymbol: string = 'AAPL';
  private readonly currency: string = 'USD';

  constructor(
    private readonly dataFetchingService: DataFetchingService,
    private readonly databoxService: DataboxService,
  ) {}

  @Cron('0 * * * *')
  async sendLatestCryptoPrice() {
    const { bars } = await this.dataFetchingService.fetchLatestCryptoBars(
      this.cryptoSymbol,
    );

    const price = bars[this.cryptoSymbol].c;
    const timestamp = bars[this.cryptoSymbol].t;

    const data = [
      {
        metricName: 'latestCryptoPrice',
        value: price,
        date: timestamp,
        unit: this.currency,
      },
    ];

    return await this.databoxService.pushData(data);
  }

  @Cron('0 0,12 * * *')
  async sendLatestCryptoOrderBooks() {
    try {
      const { orderbooks } =
        await this.dataFetchingService.fetchLatestCryptoOrderBooks(
          this.cryptoSymbol,
        );

      const { t: timestamp, a: asks, b: bids } = orderbooks[this.cryptoSymbol];
      const date = new Date(timestamp).toISOString();

      const mapOrderData = (orders: OrderbookEntry[], metricName: string) =>
        orders.map((item) => ({
          metricName,
          value: item.p,
          date,
          unit: this.currency,
          attributes: [{ key: 'size', value: item.s.toString() }],
        }));

      const askData = mapOrderData(asks, 'latestCryptoAsk');
      const bidData = mapOrderData(bids, 'latestCryptoBid');

      const askResponse = await this.databoxService.pushData(askData);
      const bidResponse = await this.databoxService.pushData(bidData);

      return {
        success: bidResponse.status === 'OK' && askResponse.status === 'OK',
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  @Cron('0 1 * * *')
  async sendStockIntraDay() {
    const response = await this.dataFetchingService.fetchStockIntraDay(
      this.stockSymbol,
      '60min',
    );

    const lastRefreshed = response['Meta Data']['3. Last Refreshed'];
    const targetDate = lastRefreshed.split(' ')[0];
    const timeSeries = response['Time Series (60min)'];

    const filteredKeys = Object.keys(timeSeries).filter((timestamp) =>
      timestamp.startsWith(targetDate),
    );

    const latestData = filteredKeys
      .slice(0, 16)
      .map((key) => ({ timestamp: key, ...timeSeries[key] }));

    latestData.reverse();

    const data = latestData.map((item) => ({
      metricName: 'stockIntraDay',
      value: item['2. high'],
      date: item.timestamp,
      unit: this.currency,
    }));

    return await this.databoxService.pushData(data);
  }

  @Cron('0 1 * * *')
  async sendStockVolume() {
    const response = await this.dataFetchingService.fetchDailyStockVolume(
      this.stockSymbol,
    );

    const timeSeries = response['Time Series (Daily)'];

    const latestData = Object.keys(timeSeries).map((key) => ({
      timestamp: key,
      ...timeSeries[key],
    }));

    latestData.reverse();

    const data = latestData.map((item) => ({
      metricName: 'stockVolume',
      value: item['5. volume'],
      date: item.timestamp,
    }));

    return await this.databoxService.pushData(data);
  }
}
