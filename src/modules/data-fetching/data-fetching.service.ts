import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AlpacaResponse } from '@app/modules/data-fetching/interface/data.fetching.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataFetchingService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get('ALPACA_API_URL');
  }

  async fetchData(): Promise<AlpacaResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.apiUrl, {
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
