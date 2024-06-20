import { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { databaseConfig } from "src/config/configuration";
import { SequelizeConfigService } from "src/config/sequelizeConfig.service";
import { User } from "src/users/users.model";
import { UsersModule } from "src/users/users.module";
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { after } from "node:test";

describe('Users controller', () => {
    let app: INestApplication;

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

        app = testModule.createNestApplication();
        await app.init(); //Инициализация тестового модуля для пользователя
    });

    afterEach(async () => {//После каждого теста удаляем тестового пользователя
        await User.destroy({ where: {username: 'TestUser'}});
    });


    //Тест контроллера(эндпоинта) создания пользователя
    it('should create user', async () => {
        const newUser = {
            username: 'TestUser',
            email: 'test_user@mail.ru',
            password: 'test1234'
        };

        const response = await request(app.getHttpServer()) //После этого запроса создается пользователь
        .post('/users/signup')
        .send(newUser);

        //Проверяем создался ли пользователь
        const passwordIsValid = await bcrypt.compare(newUser.password, response.body.password);

        expect(response.body.username).toBe(newUser.username);//сверяем логин
        expect(passwordIsValid).toBe(true);
        expect(response.body.email).toBe(newUser.email);
    })
});