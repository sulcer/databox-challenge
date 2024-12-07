import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { MetricsService } from '@app/modules/metrics/metrics.service';

@ApiTags('Metrics')
@Controller('Metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('latestCryptoPrice')
  async getLatestCryptoPrice() {
    return await this.metricsService.sendLatestCryptoPrice();
  }

  @Get('stockIntraDay')
  async getStockIntraDay() {
    return await this.metricsService.sendStockIntraDay();
  }
}
