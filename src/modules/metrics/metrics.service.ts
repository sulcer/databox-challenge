import { Injectable } from '@nestjs/common';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';
import { DataboxService } from '@app/modules/databox/databox.service';

@Injectable()
export class MetricsService {
  private readonly cryptoSymbol: string = 'BTC/USD';
  private readonly stockSymbol: string = 'AAPL';
  private readonly currency: string = 'USD';

  constructor(
    private readonly dataFetchingService: DataFetchingService,
    private readonly databoxService: DataboxService,
  ) {}

  async sendLatestCryptoPrice() {
    const { bars } = await this.dataFetchingService.fetchLatestCryptoBars(
      this.cryptoSymbol,
    );

    const price = bars[this.cryptoSymbol].c;
    const timestamp = bars[this.cryptoSymbol].t;
    console.log(bars[this.cryptoSymbol].c);

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
}
