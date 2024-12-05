import { BaseSetup } from '@app/config/app/base.setup';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isProdEnv } from '@app/common/helpers/env-check';

export class SwaggerSetup extends BaseSetup {
  constructor(readonly app: NestExpressApplication) {
    super(app);
  }

  init(): void {
    if (isProdEnv()) {
      return;
    }

    SwaggerModule.setup(
      this.configService.getOrThrow('SWAGGER_PATH'),
      this.app,
      this.createDocument(),
    );
  }

  private createDocument() {
    const config = new DocumentBuilder()
      .setTitle('NestJS API')
      .setDescription('The NestJS API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    return SwaggerModule.createDocument(this.app, config);
  }
}
