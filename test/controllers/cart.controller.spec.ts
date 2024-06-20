import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsModule } from "src/products/products.module";
import { ProductsService } from '../../src/products/products.service';
import { UsersService } from '../../src/users/users.service';
import { Cart } from '../../src/cart/cart.model';
import { CartModule } from '../../src/cart/cart.module';

const mockedUser = {
  username: 'Jhon',
  email: 'jhon@gmail.com',
  password: 'jhon123',
};

describe('Cart Controller', () => {
  let app: INestApplication;
  let productsService: ProductsService;
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
        CartModule,
        ProductsModule,
        AuthModule,
      ],
    }).compile();

    productsService = testModule.get<ProductsService>(ProductsService);
    usersService = testModule.get<UsersService>(UsersService);

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new Cart();
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const part = await productsService.findOne({where: {id: 1}});

    cart.user_id = user.id;
    cart.product_id = part.id;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await Cart.destroy({ where: { product_id: 1 } });
  });

  it('should add cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await request(app.getHttpServer())
      .post('/cart/add')
      .send({ username: mockedUser.username, user_id: user.id, product_id: 3 })
      .set('Cookie', login.headers['set-cookie']);


    const response = await request(app.getHttpServer())
      .get(`/cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          user_id: user.id,
          product_id: expect.any(Number),
          count: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get all cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
    where: { username: mockedUser.username },
    });

    await request(app.getHttpServer())
      .post('/cart/add')
      .send({ username: mockedUser.username, user_id: user.id, product_id: 3 })
      .set('Cookie', login.headers['set-cookie']);


    const response = await request(app.getHttpServer())
      .get(`/cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.product_id === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        user_id: user.id,
        product_id: 3,
        count: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('should get updated count of cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
        where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
        .post('/cart/count/update')
        .send({ username: mockedUser.username, user_id: user.id, product_id: 1, count: 2 })
        .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
        expect.objectContaining({
        id: expect.any(Number),
        user_id: user.id,
        product_id: expect.any(Number),
        count: 2,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }));
  });

  /*it('should get updated total price of cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const part = await productsService.findOne({where: {id: 1}});

    const response = await request(app.getHttpServer())
      .patch('/cart/total-price/1')
      .send({ total_price: part.price * 3 })
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ total_price: part.price * 3 });
  });*/

  it('should delete one cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
        where: { username: mockedUser.username },
    });

    await request(app.getHttpServer())
        .post('/cart/delete-one')
        .send({ username: mockedUser.username, user_id: user.id, product_id: 1, count: 1 })
        .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .get(`/cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.product_id === 1)).toBeUndefined();
  });

  it('should delete all cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await request(app.getHttpServer())
      .delete(`/cart/delete-all/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .get(`/cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toStrictEqual([]);
  });
});