import { Injectable } from '@nestjs/common';
import { Cart } from './cart.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { addToCartDto } from './dto/add-to-cart.dto';
import { updateProductCountDto } from './dto/update-product-count.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)
        private cartModel: typeof Cart,
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
    ){}

    //Нахождение всех элементов корзины по id пользователя
    async findAll(user_id: number | string): Promise<Cart[]>{
        return this.cartModel.findAll({where: { user_id }})
    }

    //Добавление элементов в корзину
    async add(addToCartDto: addToCartDto){
        const cart = new Cart();
        const user = await this.usersService.findOne({where: {username: addToCartDto.username}}); //Пользователь
        const product = await this.productsService.findOne({where: {id: addToCartDto.product_id}}); //Продукт

        cart.user_id = user.id;
        cart.product_id = product.id;

        return cart.save();
    }

    //Метод обновления количества товаров в корзине
    async updateCount(updateProductCountDto: updateProductCountDto): Promise<Cart>{
        const user = await this.usersService.findOne({where: {username: updateProductCountDto.username}}); //Пользователь
        await this.cartModel.update({ count:  updateProductCountDto.count}, {where: {user_id: user.id, product_id: updateProductCountDto.product_id}})
        
        const cart = await this.cartModel.findOne({where: {user_id: user.id, product_id: updateProductCountDto.product_id}})
        
        return cart;
    }

    //Метод удаления товара из корзины
    async remove(updateProductCountDto: updateProductCountDto): Promise<void>{
        const user = await this.usersService.findOne({where: {username: updateProductCountDto.username}}); //Пользователь
        const cart = await this.cartModel.findOne({where: {user_id: user.id, product_id: updateProductCountDto.product_id}})
        
        await cart.destroy();
    }

    //Метод удаления всех товаров пользователя из корзины
    async removeAll(user_id: number | string): Promise<void>{
        await this.cartModel.destroy({where: {user_id}})
    }
}
