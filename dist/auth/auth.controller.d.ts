import { AuthService } from './auth.service';
import { User } from 'src/users/users.schema';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(username: string, password: string): Promise<User>;
    login(input: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
        userId: number;
        username: string;
    }>;
    getUserInfo(request: any): any;
}
