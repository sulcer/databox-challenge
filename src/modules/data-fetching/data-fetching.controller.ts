import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';

@ApiTags('Data Fetching')
@Controller('data-fetching')
@ApiBearerAuth()
export class DataFetchingController {
  constructor(private readonly dataFetchingService: DataFetchingService) {}

  @ApiOperation({ summary: 'Fetch latest crypto bars from Alpaca API' })
  @Get('latest-crypto-bars')
  async getLatestCryptoBars(@Query('symbols') symbols: string) {
    return await this.dataFetchingService.fetchLatestCryptoBars(symbols);
  }

  @ApiOperation({ summary: 'Fetch latest crypto order books from Alpaca API' })
  @Get('latest-crypto-order-books')
  async getLatestCryptoOrderBooks(@Query('symbols') symbols: string) {
    return await this.dataFetchingService.fetchLatestCryptoOrderBooks(symbols);
  }

  @ApiOperation({ summary: 'Fetch stock intraday from Alpha Vantage API' })
  @Get('stock-intra-day')
  async getStockIntraDay(
    @Query('symbol') symbol: string,
    @Query('interval') interval: string,
  ) {
    return await this.dataFetchingService.fetchStockIntraDay(symbol, interval);
  }

  @ApiOperation({ summary: 'Fetch stock volume from Alpha Vantage API' })
  @Get('stock-volume')
  async getDailyStockVolume(@Query('symbol') symbol: string) {
    return await this.dataFetchingService.fetchDailyStockVolume(symbol);
  }
}
