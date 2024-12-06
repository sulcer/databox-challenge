import { BaseSetup } from '@app/config/app/base.setup';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpExceptionFilter } from '@app/common/exceptions/filters/http-exception.filter';

export class MiddlewareSetup extends BaseSetup {
  constructor(protected readonly app: NestExpressApplication) {
    super(app);
  }

  init(): void | Promise<void> {
    this.setupHelmet();
    this.setupCors();
    this.setupCompression();
    this.setupPipes();
    this.setupFilters();
    this.setupShutdownHooks();
    console.log('Middleware setup complete');
  }

  private setupHelmet() {
    this.app.use(helmet());
  }

  private setupCors() {
    const corsOrigin = this.configService.getOrThrow('CORS_ORIGIN');
    this.app.enableCors({ origin: corsOrigin });
  }

  private setupCompression() {
    this.app.use(compression());
  }

  private setupPipes() {
    this.app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
  }

  private setupFilters() {
    const adapterHost = this.app.get(HttpAdapterHost);
    this.app.useGlobalFilters(new HttpExceptionFilter(adapterHost));
  }

  private setupShutdownHooks(): void {
    this.app.enableShutdownHooks();
  }
}
