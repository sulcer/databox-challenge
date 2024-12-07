import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';

@ApiTags('Data Fetching')
@Controller('dataFetching')
export class DataFetchingController {
  constructor(private readonly dataFetchingService: DataFetchingService) {}

  @ApiOperation({ summary: 'Fetch latest crypto bars from Alpaca API' })
  @Get('latestCryptoBars')
  async getLatestCryptoBars(@Query('symbols') symbols: string) {
    return await this.dataFetchingService.fetchLatestCryptoBars(symbols);
  }

  @ApiOperation({ summary: 'Fetch latest crypto order books from Alpaca API' })
  @Get('latestCryptoOrderBooks')
  async getLatestCryptoOrderBooks(@Query('symbols') symbols: string) {
    return await this.dataFetchingService.fetchLatestCryptoOrderBooks(symbols);
  }

  @ApiOperation({ summary: 'Fetch stock intraday from Alpha Vantage API' })
  @Get('stockIntraDay')
  async getStockIntraDay(
    @Query('symbol') symbol: string,
    @Query('interval') interval: string,
  ) {
    return await this.dataFetchingService.fetchStockIntraDay(symbol, interval);
  }

  @ApiOperation({ summary: 'Fetch stock volume from Alpha Vantage API' })
  @Get('stockVolume')
  async getDailyStockVolume(@Query('symbol') symbol: string) {
    return await this.dataFetchingService.fetchDailyStockVolume(symbol);
  }
}
