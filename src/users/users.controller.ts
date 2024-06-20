import { Controller, HttpCode, HttpStatus, Post, Header, Body, Request, UseGuards, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignupResponse } from './types';

@Controller('users')//Корневой префикс user
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @ApiOkResponse({ type: SignupResponse })
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto: createUserDto){
        return this.userService.create(createUserDto);//Создание нового пользователя
    }

    @ApiBody({ type: LoginUserRequest })
    @ApiOkResponse({ type: LoginUserResponse })
    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req){
        return {user: req.user, msg: 'Logged in'};
    }

    @ApiOkResponse({ type: LoginCheckResponse })
    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req){
        return req.user;
    }

    @ApiOkResponse({ type: LogoutUserResponse })
    @Get('/logout')
    logout(@Request() req){
        req.session.destroy();
        return {message: 'Session ended'};
    }

    //Получение одного пользователя по id. Id передается параметром в адресной строке
    @ApiOkResponse({ type: LoginCheckResponse })
    @Get('findbyid/:id')
    findOneById(@Param('id') id: string){
        return this.userService.findOneById(id)
    }
}
