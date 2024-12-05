import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

export abstract class BaseSetup<SetupConfig = undefined> {
  protected configService: ConfigService;

  protected constructor(protected readonly app: NestExpressApplication) {
    this.configService = app.get(ConfigService);
  }

  abstract init(setupConfig?: SetupConfig): void | Promise<void>;
}
