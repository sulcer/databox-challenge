import { Injectable } from '@nestjs/common';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';
import { DataboxService } from '@app/modules/databox/databox.service';

@Injectable()
export class MetricsService {
  private readonly cryptoSymbol: string = 'BTC/USD';
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

    return await this.databoxService.pushData(
      'latestCryptoPrice',
      price,
      timestamp,
      this.currency,
    );
  }
}
