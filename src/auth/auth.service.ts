import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/schemas/users.schema';
import { AuthDto } from './dto';
import * as argon from 'argon2';

// adedamolatomide_db_user
// ppOOIIqGbqSLhufG
// mongodb+srv://adedamolatomide_db_user:jtV8BFNfQGO83RP9@cluster0.geyqb46.mongodb.net/?appName=Cluster0

@Injectable()
export class AuthService {
  //   constructor(@InjectModel() private recipeModel: Model<>) {}
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}
  async signup(dto: AuthDto) {
    //generate password hash
    const hashedPass = await argon.hash(dto.password);

    //save the user in db
    const createdUser = new this.usersModel({
      email: dto.email,
      passwords: hashedPass,
    });

    return createdUser.save();
  }

  login() {}
}
