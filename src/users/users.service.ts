import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findUserByName(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username }).exec()
    }

    async createUser(username: string, password: string, isAdmin: boolean): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await this.userModel.countDocuments() + 1;
        const newUser = new this.userModel({ userId, username, password: hashedPassword, isAdmin });

        return newUser.save();
    }
}