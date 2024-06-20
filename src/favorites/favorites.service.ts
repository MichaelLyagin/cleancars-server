import { Injectable } from '@nestjs/common';
import { Favorites } from './favorites.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { addToFavoritesDto } from './dto/add-to-favorites.dto';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectModel(Favorites)
        private favoritesModel: typeof Favorites,
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
    ){}

    //Нахождение всех элементов избранного по id пользователя
    async findAll(user_id: number | string): Promise<Favorites[]>{
        return this.favoritesModel.findAll({where: { user_id }})
    }

    //Добавление элементов в избранное
    async add(addToFavoritesDto: addToFavoritesDto){
        const cart = new Favorites();
        const user = await this.usersService.findOne({where: {username: addToFavoritesDto.username}}); //Пользователь
        const product = await this.productsService.findOne({where: {id: addToFavoritesDto.product_id}}); //Продукт

        cart.user_id = user.id;
        cart.product_id = product.id;

        return cart.save();
    }

    //Метод удаления товара из избранного
    async remove(addToFavoritesDto: addToFavoritesDto): Promise<void>{
        const user = await this.usersService.findOne({where: {username: addToFavoritesDto.username}}); //Пользователь
        const cart = await this.favoritesModel.findOne({where: {user_id: user.id, product_id: addToFavoritesDto.product_id}})
        
        await cart.destroy();
    }

    //Метод удаления всех товаров пользователя из избранного
    async removeAll(user_id: number | string): Promise<void>{
        await this.favoritesModel.destroy({where: {user_id}})
    }
}