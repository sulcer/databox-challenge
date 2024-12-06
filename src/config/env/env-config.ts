import { z } from 'zod';
import { Environment } from '@app/common/types/enums/env.enum';

export const environmentVariablesSchema = z.object({
  NODE_ENV: z.nativeEnum(Environment),
  PORT: z.coerce.number().int().positive(),
  SWAGGER_PATH: z.string().optional(),
  CORS_ORIGIN: z.string().optional(),
  ALPACA_API_URL: z.string().optional(),
});

export type EnvironmentVariables = z.infer<typeof environmentVariablesSchema>;
