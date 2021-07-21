import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/user.schema';
import { UpdateUserDto} from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({email: email}).exec();
  }

  async create(createTodoDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(createTodoDto.email);
    if (user) throw new BadRequestException('error.UserExist');
    return await new this.userModel({
      ...createTodoDto,
      created: new Date(),
    }).save();
  }

  async update(id: string, updateTodoDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
