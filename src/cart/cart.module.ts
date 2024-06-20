import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  //В модуле корзины используются и пользователи и товары
  imports: [SequelizeModule.forFeature([Cart]), UsersModule, ProductsModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
