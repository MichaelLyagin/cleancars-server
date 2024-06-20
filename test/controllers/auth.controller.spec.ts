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
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthModule } from "src/auth/auth.module";

//Моковый пользователь
const mockedUser = {
    username: 'Ivan',
    email: 'ivan@mail.ru',
    password: 'ivan1234'
};

describe('Auth Controller', () => {
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
                  AuthModule,
            ]
        }).compile();

        app = testModule.createNestApplication();
        app.use(session({
            secret: 'keyword',
            resave: false,
            saveUninitialized: false,
          }))
          app.use(passport.initialize());
          app.use(passport.session());
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


    //Тест контроллера(эндпоинта) входа пользователя
    it('should login user', async () => {

        const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username, password: mockedUser.password});


        expect(response.body.user.username).toBe(mockedUser.username);//сверяем логин
        expect(response.body.msg).toBe('Logged in');
        expect(response.body.user.email).toBe(mockedUser.email);
    })

    //Тест контроллера(эндпоинта) проверки входа пользователя
    it('should login user', async () => {

        const login = await request(app.getHttpServer()) //После этого запроса происходит логин
        .post('/users/login')
        .send({username: mockedUser.username, password: mockedUser.password});

        const loginCheck = await request(app.getHttpServer()) //После этого запроса проверяется логин
        .get('/users/login-check')
        .set('Cookie', login.headers['set-cookie']);

        expect(loginCheck.body.username).toBe(mockedUser.username);//сверяем логин
        expect(loginCheck.body.email).toBe(mockedUser.email);
    })

        //Тест контроллера(эндпоинта) выхода пользователя
        it('should logout user', async () => {

            const response = await request(app.getHttpServer()) //После этого запроса происходит логин
            .get('/users/logout');

            expect(response.body.message).toBe('Session ended');//сверяем логин
        })
});