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
import { ProductsModule } from "src/products/products.module";

//Моковый пользователь
const mockedUser = {
    username: 'Ivan',
    email: 'ivan@mail.ru',
    password: 'ivan1234'
};

describe('Products Controller', () => {
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
                  ProductsModule,
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

    //Тест контроллера(эндпоинта) получения одного продукта
    it('should get one product', async () => {
        const response = await request(app.getHttpServer())
        .get('/products/find/1'); //Получаем продукт с id 1


        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                despription: expect.any(String),
                name: expect.any(String),
                img: expect.any(String),
                category_id: expect.any(Number),
                price: expect.any(Number),
                brand: expect.any(String),
                volume: expect.any(Number),
                in_stock: expect.any(Number),
                vendor_code: expect.any(String),
                popularity: expect.any(Number),
                bestseller: expect.any(Boolean),

            })
        );
    })

    //Тест контроллера(эндпоинта) получения одного продукта
    it('should get bestsellers', async () => {
        const response = await request(app.getHttpServer())
        .get('/products/bestsellers'); //Получаем бестселлеры

        expect(response.body.rows).toEqual(
            expect.arrayContaining([{
                id: expect.any(Number),
                name: expect.any(String),
                despription: expect.any(String),
                img: expect.any(String),
                category_id: expect.any(Number),
                price: expect.any(Number),
                brand: expect.any(String),
                volume: expect.any(Number),
                in_stock: expect.any(Number),
                vendor_code: expect.any(String),
                popularity: expect.any(Number),
                bestseller: true,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }])
        );
    });

    //Тест контроллера(эндпоинта) поиска продуктов по названию
    it('should search product', async () => {
        const body = {search: 'wash'}
        const response = await request(app.getHttpServer())
        .post('/products/search')
        .send(body)

        expect(response.body.rows.length).toBeLessThanOrEqual(7); //лимит отображаемых товаров

        response.body.rows.forEach(element => {
            expect(element.name.toLowerCase()).toContain(body.search) //содержит ли название поисковую строку
        });

        expect(response.body.rows).toEqual(
            expect.arrayContaining([{
                id: expect.any(Number),
                name: expect.any(String),
                despription: expect.any(String),
                img: expect.any(String),
                category_id: expect.any(Number),
                price: expect.any(Number),
                brand: expect.any(String),
                volume: expect.any(Number),
                in_stock: expect.any(Number),
                vendor_code: expect.any(String),
                popularity: expect.any(Number),
                bestseller: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }])
        );
    })

    //Тест контроллера(эндпоинта) получения одного продукта по названию
    it('should get product by name', async () => {
        const body = {name: 'Wavex Strip Wash Shampoo'}
        const response = await request(app.getHttpServer())
        .post('/products/name')
        .send(body)

        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: body.name,
                despription: expect.any(String),
                img: expect.any(String),
                category_id: expect.any(Number),
                price: expect.any(Number),
                brand: expect.any(String),
                volume: expect.any(Number),
                in_stock: expect.any(Number),
                vendor_code: expect.any(String),
                popularity: expect.any(Number),
                bestseller: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            })
        );
    })
});