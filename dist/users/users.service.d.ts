import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findUserByName(username: string): Promise<User | undefined>;
    createUser(username: string, password: string): Promise<User>;
}
