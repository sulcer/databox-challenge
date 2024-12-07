import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MetricsService } from '@app/modules/metrics/metrics.service';
import { MetricsController } from '@app/modules/metrics/metrics.controller';
import { DataFetchingModule } from '@app/modules/data-fetching/data-fetching.module';
import { DataboxModule } from '@app/modules/databox/databox.module';

@Module({
  imports: [HttpModule, DataFetchingModule, DataboxModule],
  providers: [MetricsService],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
