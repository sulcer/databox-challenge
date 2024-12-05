import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SwaggerSetup } from '@app/config/app/swagger.setup';
import { Logger } from '@nestjs/common';
import { loadEnv } from '@app/config/env/dotenv';

loadEnv();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  new SwaggerSetup(app).init();

  const PORT = configService.get('PORT') ?? 3000;
  const SWAGGER_PATH = configService.get('SWAGGER_PATH') ?? '/api-docs';

  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
  Logger.log(
    `Swagger running on http://localhost:${PORT}${SWAGGER_PATH}`,
    'Bootstrap',
  );
}

(async (): Promise<void> => {
  await bootstrap().catch((err: unknown) => {
    Logger.error(err, 'Error');
  });
})();
