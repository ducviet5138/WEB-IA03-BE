import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/user/register")
  registerUser(): string {
    return "User registered successfully";
  }
}
