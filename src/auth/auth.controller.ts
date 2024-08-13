import { Controller, HttpCode, HttpStatus, NotImplementedException, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { User } from 'src/users/users.schema';
import { AdminGuard } from './guards/admin.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signUp(@Body('username') username: string, @Body('password') password: string, @Body('isAdmin') isAdmin: boolean): Promise<User> {
        return this.authService.signUp(username, password, isAdmin)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: {username: string; password: string}) {
        return this.authService.authenticate(input)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return request.user;
    }

    @UseGuards(AuthGuard, AdminGuard)
    @Get('admin')
    getAdminInfo(@Request() request) {
        return "You are an admin"
    }
}