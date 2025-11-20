import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CitiesModule } from './cities/cities.module';

const DB =
  'mongodb+srv://adedamolatomide_db_user:jtV8BFNfQGO83RP9@cluster0.geyqb46.mongodb.net/?appName=Cluster0';

@Module({
  imports: [AuthModule, UserModule, CitiesModule, MongooseModule.forRoot(DB)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
