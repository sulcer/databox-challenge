import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from '@app/config/env/env.validation';
import { ConfigModule } from '@nestjs/config';
import { isTestEnv } from '@app/common/helpers/env-check';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { DataFetchingModule } from '@app/modules/data-fetching/data.fetching.module';
import { DataboxModule } from '@app/modules/databox/databox.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: isTestEnv() ? '.env.test' : '.env',
      isGlobal: true,
      validate: validateEnv,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    DataFetchingModule,
    DataboxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
