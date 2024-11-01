import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongoDatabase } from './database/mongo.database';

@Module({
  imports: [MongoDatabase, UserModule],
})
export class MainModule {}
