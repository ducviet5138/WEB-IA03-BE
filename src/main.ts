import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './interceptors/transform-resonse.interceptor';
import { ExceptionHandlerInterceptor } from './interceptors/exception-handler.interceptor';
import { ThrowFirstErrorValidationPipe } from './pipes/throw-first-error-validation.pipe';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformResponseInterceptor(new Reflector()));
  app.useGlobalInterceptors(new ExceptionHandlerInterceptor());
  app.useGlobalPipes(ThrowFirstErrorValidationPipe);
  await app.listen(3000);
  Logger.log(`🚀 Main application is running on: http://localhost:3000`)
}

bootstrap();
