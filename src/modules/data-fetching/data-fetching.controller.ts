import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';

@ApiTags('Data Fetching')
@Controller('DataFetching')
export class DataFetchingController {
  constructor(private readonly dataFetchingService: DataFetchingService) {}

  @ApiOperation({ summary: 'Fetch data from Alpaca API' })
  @Get()
  async getData() {
    return await this.dataFetchingService.fetchData();
  }
}
