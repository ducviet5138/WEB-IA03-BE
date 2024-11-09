import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(payload: any) {
    try {
      return this.jwtService.sign(payload);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  async validateJwtToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
