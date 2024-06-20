import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDto, updateProductCountDto, updateProductDto } from './dto/create-product.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Bestsellers, FindOneResponse, GetBestsellersResponse, GetByNameRequest, GetByNameResponse, PaginateAndFilterResponse, Products, SearchRequest, SearchResponse } from './types';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createProduct(@Body() createProductDto: createProductDto){
        return this.productsService.create(createProductDto);//Создание нового товара
    }

    //Получение лимитированных элементов
    @ApiOkResponse({ type: PaginateAndFilterResponse })
    @Get()
    paginateAndFilter(@Query() query){
        return this.productsService.paginateAndFilter(query)
    }

    //Получение одного продукта по id. Id передается параметром в адресной строке
    @ApiOkResponse({ type: FindOneResponse })
    @Get('find/:id')
    getOne(@Param('id') id: string){
        return this.productsService.findOne({where: {id: id}})
    }

    //Получение бестселлеров
    @ApiOkResponse({ type: GetBestsellersResponse })
    @Get('bestsellers')
    getBestsellers(){
        return this.productsService.bestsellers()
    }

    //Получение новинок
    @ApiOkResponse({ type: GetBestsellersResponse })
    @Get('new')
    getNew(){
        return this.productsService.newItems()
    }

    //Поиск по названию, возвращает массив подходящих элементов
    @ApiOkResponse({ type: SearchResponse })
    @ApiBody({ type: SearchRequest })
    @Post('search')
    search(@Body() {search}: {search: string}){
        return this.productsService.searchByString(search);
    }

    //Поиск по названию, возвращает один элемент
    @ApiOkResponse({ type: GetByNameResponse })
    @ApiBody({ type: GetByNameRequest })
    @Post('name')
    getByName(@Body() {name}: {name: string}){
        return this.productsService.findOneByName(name);
    }

    //Обновление товара
    @ApiOkResponse({ type: FindOneResponse })
    @UseGuards(AuthenticatedGuard)
    @Post('/update')
    updateProduct(@Body() updateProduct: updateProductDto){
        return this.productsService.updateProduct(updateProduct)    
    }

    //Обновление количества товара
    @ApiOkResponse({ type: FindOneResponse })
    @UseGuards(AuthenticatedGuard)
    @Post('/update-count')
    updateProductCount(@Body() updateProductCount: updateProductCountDto){
        return this.productsService.updateProductCount(updateProductCount)    
    }

    //Удаление товара
    @UseGuards(AuthenticatedGuard)
    @Post('/delete/:id')
    deleteProduct(@Param('id') id: string){
        return this.productsService.deleteProduct(id)    
    }
}
