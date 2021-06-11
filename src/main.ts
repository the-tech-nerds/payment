import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
// import { ValidationPipe } from '@nestjs/common';
import { setBootstrap } from '@the-tech-nerds/common-services';
import { AppModule } from './app.module';
// import { ErrorFilter } from './filters/error.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await setBootstrap(app);
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.useGlobalFilters(new ErrorFilter(new ApiResponseService()));
  // app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-use-before-define,no-void
void bootstrap();
