import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CitiesModule } from './cities/cities.module';
import { ConfigModule } from '@nestjs/config';

if (!process.env.DB) {
  throw new Error('DB environment variable is not defined');
}
@Module({
  imports: [
    ConfigModule.forRoot({}),
    AuthModule,
    UserModule,
    CitiesModule,
    MongooseModule.forRoot(process.env.DB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
