import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';

@ApiTags('Data Fetching')
@Controller('DataFetching')
export class DataFetchingController {
  constructor(private readonly dataFetchingService: DataFetchingService) {}

  @ApiOperation({ summary: 'Fetch data from Alpaca API' })
  @Get('latestCryptoBars')
  async getData(@Query('symbols') symbols: string) {
    return await this.dataFetchingService.fetchLatestCryptoBars(symbols);
  }

  @ApiOperation({ summary: 'Fetch data from Alpha Vantage API' })
  @Get('stockIntraDay')
  async getDataAV(
    @Query('symbol') symbol: string,
    @Query('interval') interval: string,
  ) {
    return await this.dataFetchingService.fetchStockIntraDay(symbol, interval);
  }
}
