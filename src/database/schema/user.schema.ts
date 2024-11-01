import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
  },
})
export class User extends Document implements IUser {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
