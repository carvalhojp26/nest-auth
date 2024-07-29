import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

type AuthInput = {
    username: string;
    password: string;
}

type SignInData = {
    userId: number;
    username: string;
}

type AuthResult = {
    accessToken: string;
    userId: number;
    username: string;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService  
    ) {}

    async signUp(username: string, password: string): Promise<User> {
        const user = await this.usersService.createUser(username, password);

        return user;
    }

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);

        if(!user) {
            throw new UnauthorizedException();
        }

        return this.signIn(user)
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findUserByName(input.username);

        if(user && await bcrypt.compare(input.password, user.password)) {
            return {    
                userId: user.userId,
                username: user.username
            };
        }
    
        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username 
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload)

        return {
            accessToken,
            username: user.username,
            userId: user.userId
        }
    }
}