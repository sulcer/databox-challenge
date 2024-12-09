import { Module } from '@nestjs/common';
import { CustomLogger } from '@app/logger/logger.service';

@Module({
  providers: [
    {
      provide: 'Logger',
      useClass: CustomLogger,
    },
  ],
  exports: ['Logger'],
})
export class LoggerModule {}
