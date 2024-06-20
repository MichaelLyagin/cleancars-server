import { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { databaseConfig } from "src/config/configuration";
import { SequelizeConfigService } from "src/config/sequelizeConfig.service";
import { User } from "src/users/users.model";
import * as bcrypt from 'bcrypt';
import { AuthService } from "src/auth/auth.service";
import { ProductsModule } from "src/products/products.module";
import { ProductsService } from "src/products/products.service";

//Моковый пользователь
const mockedUser = {
    username: 'Ivan',
    email: 'ivan@mail.ru',
    password: 'ivan1234'
};

describe('Products Service', () => {
    let app: INestApplication;
    let productsService: ProductsService; 

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
            ]
        }).compile();

        productsService = testModule.get<ProductsService>(ProductsService);
        app = testModule.createNestApplication();
        await app.init(); //Инициализация тестового модуля для пользователя
    });

    //Тест сервиса(метода) получения товара по id
    it('should find by id', async () => {
        const product = await productsService.findOne({where: {id: 1}})

        expect(product.dataValues).toEqual(
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

    //Тест сервиса(метода) получения товара по названию
    it('should find by name', async () => {
        const product = await productsService.findOneByName('Wavex Strip Wash Shampoo')

        expect(product.dataValues).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                despription: expect.any(String),
                name: 'Wavex Strip Wash Shampoo',
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

    //Тест сервиса(метода) получения товаров по строке поиска
    it('should find by name', async () => {
        const products = await productsService.searchByString('wash')

        expect(products.rows.length).toBeLessThanOrEqual(7); //лимит отображаемых товаров

        products.rows.forEach(element => {
            expect(element.name.toLowerCase()).toContain('wash') //содержит ли название поисковую строку
            expect(element.dataValues).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
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
        });
    })

    //Тест сервиса(метода) получения бестселлеров
    it('should find bestsellers', async () => {
        const products = await productsService.bestsellers()

        products.rows.forEach(element => {
            expect(element.dataValues).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
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
                    bestseller: true,
    
                })
            );
        });
    })
});