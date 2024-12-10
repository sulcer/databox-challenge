import { Module } from '@nestjs/common';
import { DataFetchingController } from '@app/modules/data-fetching/data-fetching.controller';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '@app/logger/logger.module';

@Module({
  imports: [HttpModule, LoggerModule],
  providers: [DataFetchingService],
  controllers: [DataFetchingController],
  exports: [DataFetchingService],
})
export class DataFetchingModule {}
