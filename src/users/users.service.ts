import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ){}

    //Поиск одного пользователя
    findOne(filter: {where: {id?: string; username?: string; email?: string}}): Promise<User>{
        return this.userModel.findOne({...filter});
    }

    //Поиск одного пользователя по id
    findOneById(id: string): Promise<User>{
        return this.userModel.findOne({where: {id: id}});
    }

    //Метод создания пользователя
    async create(createUserDto: createUserDto): Promise<User | {warningMessage: string}>{
        const user = new User();
        //Существует пользователь с такой почтой?
        const existingByUsername = await this.findOne({
            where: {username: createUserDto.username},
        });

        const existingByEmail = await this.findOne({
            where: {email: createUserDto.email},
        });

        if(existingByUsername){
            return {warningMessage: 'Пользователь с таким логином уже существует'}
        }

        if(existingByEmail){
            return {warningMessage: 'Пользователь с такой почтой уже существует'}
        }

        //Хэшируем пароль с помощью библиотеки bcrypt. 10-уровень сложности хэширования
        //createUserDto.password - пароль с фронта, который ввел пользователь
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = hashedPassword;
        user.role = false; //true-админ, false-клиент

        return user.save();
    }
}
