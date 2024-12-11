import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  AlpacaBarsResponse,
  AlpacaOrderbooksResponse,
  AlphaVantageResponse,
} from '@app/modules/data-fetching/interface/data.fetching.interface';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from '@app/logger/logger.service';

@Injectable()
export class DataFetchingService {
  private readonly apiUrl: string;
  private readonly alphaVantageApi: string;
  private readonly alphaVantageApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject('Logger') private readonly logger: CustomLogger,
  ) {
    this.apiUrl = this.configService.get('ALPACA_API_URL');
    this.alphaVantageApi = this.configService.get('ALPHA_VANTAGE_API_URL');
    this.alphaVantageApiKey = this.configService.get('ALPHA_VANTAGE_API_KEY');
  }

  async fetchLatestCryptoBars(symbols: string): Promise<AlpacaBarsResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/latest/bars`, {
          params: { symbols },
          headers: { accept: 'application/json' },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error: ${error}`, 'DataFetchingService');
      throw error;
    }
  }

  async fetchLatestCryptoOrderBooks(
    symbols: string,
  ): Promise<AlpacaOrderbooksResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/latest/orderbooks`, {
          params: { symbols },
          headers: { accept: 'application/json' },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error: ${error}`, 'DataFetchingService');
      throw error;
    }
  }

  async fetchStockIntraDay(
    symbol: string,
    interval: string,
  ): Promise<AlphaVantageResponse> {
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

      return response.data;
    } catch (error) {
      this.logger.error(`Error: ${error}`, 'DataFetchingService');
      throw error;
    }
  }

  async fetchDailyStockVolume(symbol: string): Promise<AlphaVantageResponse> {
    const params = {
      function: 'TIME_SERIES_DAILY',
      symbol,
      apikey: this.alphaVantageApiKey,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(this.alphaVantageApi, {
          params,
          headers: { accept: 'application/json' },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error: ${error}`, 'DataFetchingService');
      throw error;
    }
  }
}
