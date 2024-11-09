import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from 'src/dtos/register.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { LoggedInGuard } from 'src/guard/logged-in.guard';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { ICurrentUser } from 'src/interfaces/current-user.interface';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  registerUser(@Body() dto: RegisterDto) {
    return this.userService.registerUser(dto);
  }

  @Post("/login")
  loginUser(@Body() dto: LoginDto) {
    return this.userService.loginUser(dto);
  }

  @UseGuards(LoggedInGuard)
  @Get("/profile")
  getProfile(@CurrentUser() user: ICurrentUser) {
    return this.userService.getProfile(user);
  }
}
