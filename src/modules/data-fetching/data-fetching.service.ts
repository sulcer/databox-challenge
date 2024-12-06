import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AlpacaResponse } from '@app/modules/data-fetching/interface/data.fetching.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataFetchingService {
  private readonly apiUrl: string;
  private readonly alphaVantageApi: string;
  private readonly alphaVantageApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get('ALPACA_API_URL');
    this.alphaVantageApi = this.configService.get('ALPHA_VANTAGE_API_URL');
    this.alphaVantageApiKey = this.configService.get('ALPHA_VANTAGE_API_KEY');
  }

  async fetchLatestCryptoBars(symbols: string): Promise<AlpacaResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/latest/bars`, {
          params: { symbols },
          headers: { accept: 'application/json' },
        }),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchStockIntraDay(symbol: string, interval: string): Promise<any> {
    const params = {
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      interval,
      apikey: this.alphaVantageApiKey,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(this.alphaVantageApi, {
          params,
          headers: { accept: 'application/json' },
        }),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
