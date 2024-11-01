import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from 'src/dtos/register.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/user/register")
  registerUser(@Body() dto: RegisterDto) {
    return this.userService.registerUser(dto);
  }
}
