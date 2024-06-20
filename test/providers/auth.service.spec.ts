import { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { databaseConfig } from "src/config/configuration";
import { SequelizeConfigService } from "src/config/sequelizeConfig.service";
import { User } from "src/users/users.model";
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";

//Моковый пользователь
const mockedUser = {
    username: 'Ivan',
    email: 'ivan@mail.ru',
    password: 'ivan1234'
};

describe('Auth Service', () => {
    let app: INestApplication;
    let authService: AuthService; 

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRootAsync({
                    imports: [ConfigModule],
                    useClass: SequelizeConfigService,
                  }),
                  ConfigModule.forRoot({
                    load: [databaseConfig],
                  }),
                  AuthModule,
            ]
        }).compile();

        authService = testModule.get<AuthService>(AuthService);
        app = testModule.createNestApplication();
        await app.init(); //Инициализация тестового модуля для пользователя
    });

    beforeEach(async () => { //Создаем тестового пользователя перед каждым тестом
        const user = new User();

        const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

        user.username = mockedUser.username;
        user.email = mockedUser.email;
        user.password = hashedPassword;
        user.role = false; //true-админ, false-клиент

        return user.save();

    })

    afterEach(async () => {//После каждого теста удаляем тестового пользователя
        await User.destroy({ where: {username: mockedUser.username}});
    });


    //Тест сервиса(метода) проверки данных пользователя при входе
    it('should validate user', async () => {
        const user = await authService.validateUser(
            mockedUser.username,
            mockedUser.password
        )

        expect(user.username).toBe(mockedUser.username);//сверяем логин
        expect(user.email).toBe(mockedUser.email);
    })
});