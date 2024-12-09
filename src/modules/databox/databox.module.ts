import { Module } from '@nestjs/common';
import { DataboxService } from '@app/modules/databox/databox.service';
import { DataboxController } from '@app/modules/databox/databox.controller';
import { LoggerModule } from '@app/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [DataboxService],
  controllers: [DataboxController],
  exports: [DataboxService],
})
export class DataboxModule {}
