import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { MetricsService } from '@app/modules/metrics/metrics.service';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @ApiOperation({ summary: 'Send latestCryptoPrice to Databox' })
  @ApiOkResponse({
    description: 'Latest Crypto Price sent to Databox successfully',
  })
  @Post('latest-crypto-price')
  async getLatestCryptoPrice() {
    return await this.metricsService.sendLatestCryptoPrice();
  }

  @ApiOperation({ summary: 'Send latestCryptoOrderBooks to Databox' })
  @ApiOkResponse({
    description: 'Latest Crypto Order Books sent to Databox successfully',
  })
  @Post('crypto-order-books')
  async getCryptoOrderBooks() {
    return await this.metricsService.sendLatestCryptoOrderBooks();
  }

  @ApiOperation({ summary: 'Send stockIntraDay to Databox' })
  @ApiOkResponse({
    description: 'Stock Intra Day sent to Databox successfully',
  })
  @Post('stock-intra-day')
  async getStockIntraDay() {
    return await this.metricsService.sendStockIntraDay();
  }

  @ApiOperation({ summary: 'Send stockVolume to Databox' })
  @ApiOkResponse({
    description: 'Stock Volume sent to Databox successfully',
  })
  @Post('stock-volume')
  async getStockVolume() {
    return await this.metricsService.sendStockVolume();
  }
}
