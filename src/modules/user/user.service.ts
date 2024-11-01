import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schema/user.schema';
import { RegisterDto } from 'src/dtos/register.dto';
import { IUser } from 'src/interfaces/user.interface';
import { hashPassword } from 'src/utils/hash-password';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  async registerUser(dto: RegisterDto) {
    try {
      const newUser = await this.userModel.create({
        email: dto.email,
        password: await hashPassword(dto.password),
      });

      return {
        ...newUser.toJSON(),
        password: undefined,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
