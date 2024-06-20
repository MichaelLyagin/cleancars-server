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
import { CartService } from '../../src/cart/cart.service';

const mockedUser = {
  username: 'Jhon1',
  email: 'jhon1@gmail.com',
  password: 'jhon123',
};

describe('Cart Service', () => {
  let app: INestApplication;
  let productsService: ProductsService;
  let usersService: UsersService;
  let cartService: CartService;

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
      ],
    }).compile();

    productsService = testModule.get<ProductsService>(ProductsService);
    usersService = testModule.get<UsersService>(UsersService);
    cartService =
      testModule.get<CartService>(CartService);

    app = testModule.createNestApplication();

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

  it('should return all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await cartService.findAll(user.id);

    cart.forEach((item) =>
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          user_id: user.id,
          product_id: expect.any(Number),
          count: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ),
    );
  });

  it('should add cart items', async () => {
    await cartService.add({
      username: mockedUser.username,
      product_id: 3,
    });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await cartService.findAll(user.id);

    expect(cart.find((item) => item.product_id === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        user_id: user.id,
        product_id: 3,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  /*it('should return updated count', async () => {
    const user = await usersService.findOne({
        where: { username: mockedUser.username },
      });

    await cartService.add({
        username: mockedUser.username,
        product_id: 3,
    });

    const result = await cartService.updateCount(
        {
            username: mockedUser.username,
            user_id: user.id,
            product_id: 3,
            count: 2,
        }
    );

    expect(result).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            user_id: user.id,
            product_id: 3,
            count: 2,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
    );
  });*/

  it('should delete cart item', async () => {

    const user = await usersService.findOne({
        where: { username: mockedUser.username },
    });

    await cartService.remove(
        {
            username: mockedUser.username,
            user_id: user.id,
            product_id: 1,
            count: 2,
        }
    );

    const cart = await cartService.findAll(user.id);

    expect(cart.find((item) => item.product_id === 1)).toBeUndefined();
  });

  it('should delete all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await cartService.removeAll(user.id);

    const cart = await cartService.findAll(user.id);

    expect(cart).toStrictEqual([]);
  });
});