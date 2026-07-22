import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConsulClient, ServiceOption } from '@lib/consul';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { SERVICE_NAME, SERVICE_HOST, SERVICE_PORT } =
    (await ConsulClient.LoadConfig('micro_authz')) as unknown as ServiceOption;

  await app.listen(SERVICE_PORT);
  console.info(
    `🚀 ${SERVICE_NAME} is running on: http://${SERVICE_HOST}:${SERVICE_PORT}`,
  );
}

void bootstrap();
