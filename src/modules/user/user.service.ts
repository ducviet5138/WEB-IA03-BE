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
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { ICurrentUser } from 'src/interfaces/current-user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>,
    private readonly authService: AuthService,
  ) {}

  async registerUser(dto: RegisterDto) {
    try {
      const existedUser = await this.userModel.findOne({ email: dto.email });
      if (existedUser) {
        throw new Error('User already exists');
      }

      const saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(dto.password, saltRound);

      const newUser = await this.userModel.create({
        email: dto.email,
        password: hashedPassword,
      });

      return {
        token: this.authService.generateJwtToken({ id: newUser._id.toString() }),
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async loginUser(dto: any) {
    try {
      const user = await this.userModel.findOne({
        email: dto.email,
      });
      if (!user || !(await bcrypt.compare(dto.password, user.password))) {
        throw new Error('User or password is incorrect');
      }

      return {
        token: this.authService.generateJwtToken({ id: user._id.toString() }),
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProfile(user: ICurrentUser) {
    try {
      const profile = await this.userModel.findById(user.id).select("email");
      return profile;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
