import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './products.model';
import { createProductDto, updateProductCountDto, updateProductDto } from './dto/create-product.dto';
import { IProductQuery, IProductsFilter } from './types';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products)
        private productModel: typeof Products,
    ){}

    //Поиск одного товара
    findOne(filter: {where: {id?: number | string; name?: string; brand?: string}}): Promise<Products>{
        return this.productModel.findOne({...filter});
    }

    //Метод создания товара
    async create(createProductDto: createProductDto): Promise<Products | {warningMessage: string}>{
        const product = new Products();
        //Существует товар с таким названием?
        const existingByName = await this.findOne({
            where: {name: createProductDto.name},
        });

        if(existingByName){
            return {warningMessage: 'Товар с таким названием уже существует'}
        }

        product.name = createProductDto.name;
        product.despription = createProductDto.despription;
        product.img = createProductDto.img;
        product.category_id = createProductDto.category_id;
        product.price = createProductDto.price;
        product.brand = createProductDto.brand;
        product.volume = createProductDto.volume;
        product.in_stock = createProductDto.in_stock;
        product.vendor_code = createProductDto.vendor_code;
        product.popularity = createProductDto.popularity;
        product.bestseller = createProductDto.bestseller;

        return product.save();
    }

    //Возрвращает данные по пагинации и фильтрам
    async paginateAndFilter(query: IProductQuery): Promise<{count: number; rows: Products[]}>{
        if(!query.category && !query.limit && !query.offset && !query.priceFrom && !query.priceTo && !query.volumeFrom
            && !query.volumeTo && !query.brand
        ){
            return this.productModel.findAndCountAll({})
        }
        
        const limit = +query.limit;
        const offset = +query.offset * 6; //Смещение для страниц пагинации. На одной странице 20 товаров
        const category = +query.category; 
        const filter = {} as Partial<IProductsFilter>;

        if (query.priceFrom && query.priceTo) {
            filter.price = {
              [Op.between]: [+query.priceFrom, +query.priceTo],
            };
        }

        if (query.volumeFrom && query.volumeTo) {
            filter.volume = {
              [Op.between]: [+query.volumeFrom, +query.volumeTo],
            };
        }

        if (query.brand) {
            filter.brand = JSON.parse(decodeURIComponent(query.brand));
          }
        

        if(category === 0 || category === undefined || category === null || !category)
            return this.productModel.findAndCountAll({limit, offset, where: filter})
        if(category === 10){ //Получение продуктов категории
            const cat1Array = await this.productModel.findAndCountAll({
                where: [filter, {[Op.or]: [{category_id: 11}, {category_id: 12}, {category_id: 13}, {category_id: 14}]}]})
            const result = {
                count: cat1Array.count,
                rows: cat1Array.rows.slice(offset, offset+limit)
            }
            return result
        }
        if(category === 20){ //Получение продуктов категории 2
            const cat2Array = await this.productModel.findAndCountAll({
                where: [filter, {[Op.or]: [{category_id: 21}, {category_id: 22}, {category_id: 23}, {category_id: 24}]}]})
            const result = {
                count: cat2Array.count,
                rows: cat2Array.rows.slice(offset, offset+limit)
            }
            return result
        } else { //Получение продуктов конкретной категории
            const catArray = await this.productModel.findAndCountAll({where: [filter, {category_id: category}]})
            const result = {
                count: catArray.count,
                rows: catArray.rows.slice(offset, offset+limit)
            }
            return result
        }
    }

    //Возрвращает бестселлеры
    async bestsellers(): Promise<{count: number; rows: Products[]}>{
        return this.productModel.findAndCountAll({where: {bestseller: true}})
    }

    //Возрвращает новинки
    async newItems(): Promise<{count: number; rows: Products[]}>{
        return this.productModel.findAndCountAll({limit: 5})
    }

    //Возвращает один элемент по названию
    async findOneByName(name: string): Promise<Products>{
        return this.productModel.findOne({where: {name}})
    }

    //Возрвращает массив с результатом поиска
    async searchByString(str: string): Promise<{count: number; rows: Products[]}>{
        return this.productModel.findAndCountAll({
            limit: 7, 
            where: {name: {[Op.like]: `%${str}%`}}
        })
    }

    //Метод удаления продукта
    async deleteProduct(id: number | string): Promise<void>{
        const product = await this.productModel.findOne({where: {id: Number(id)}}); //Продукт на удаление
        
        await product.destroy();
    }

    //Метод обновления товара
    async updateProduct(updateProduct: updateProductDto): Promise<Products | {warningMessage: string}>{
        await this.productModel.update(
            {
                name:  updateProduct.name,
                despription:  updateProduct.despription,
                img:  updateProduct.img,
                category_id:  updateProduct.category_id,
                price:  updateProduct.price,
                brand:  updateProduct.brand,
                volume:  updateProduct.volume,
                in_stock:  updateProduct.in_stock,
                vendor_code:  updateProduct.vendor_code,
                popularity:  updateProduct.popularity,
                bestseller:  updateProduct.bestseller,
            }, {where: {id: updateProduct.id}})

            const product = await this.productModel.findOne({where: {id: updateProduct.id}});

        return product;
    }

        //Метод обновления количества товара
        async updateProductCount(updateProductCount: updateProductCountDto): Promise<Products | {warningMessage: string}>{
            await this.productModel.update(
                {
                    in_stock:  updateProductCount.in_stock,
                }, {where: {id: updateProductCount.id}})
    
                const product = await this.productModel.findOne({where: {id: updateProductCount.id}});
    
            return product;
        }
}
