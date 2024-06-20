import { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { databaseConfig } from "src/config/configuration";
import { SequelizeConfigService } from "src/config/sequelizeConfig.service";
import { User } from "src/users/users.model";
import { UsersModule } from "src/users/users.module";
import * as bcrypt from 'bcrypt';
import { after } from "node:test";
import { UsersService } from "src/users/users.service";

describe('Users service', () => {
    let app: INestApplication;
    let usersService: UsersService;

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
                  UsersModule,
            ]
        }).compile();

        usersService = testModule.get<UsersService>(UsersService);//Получение доступа к сервису
        app = testModule.createNestApplication();
        await app.init(); //Инициализация тестового модуля для пользователя
    });

    afterEach(async () => {//После каждого теста удаляем тестового пользователя
        await User.destroy({ where: {username: 'Test1User'}});
    });


    //Тест сервиса(метода) создания пользователя
    it('should create user', async () => {
        const newUser = {
            username: 'Test1User',
            email: 'test1_user@mail.ru',
            password: 'test11234',
            role: false,
        };

        const user = await usersService.create(newUser) as User;

        //Проверяем создался ли пользователь
        const passwordIsValid = await bcrypt.compare(newUser.password, user.password);


        expect(user.username).toBe(newUser.username);//сверяем логин
        expect(passwordIsValid).toBe(true);
        expect(user.email).toBe(newUser.email);
    })
});