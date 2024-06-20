import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { addToCartDto } from './dto/add-to-cart.dto';
import { updateProductCountDto } from './dto/update-product-count.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AddToCartResponse, GetAllResponse, UpdateCountResponse } from './types';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @ApiOkResponse({ type: [GetAllResponse] })
    @UseGuards(AuthenticatedGuard)
    @Get('/:id')
    getAll(@Param('id') user_id: string ){
        return this.cartService.findAll(user_id)    
    }

    @ApiOkResponse({ type: AddToCartResponse })
    @UseGuards(AuthenticatedGuard)
    @Post('/add')
    addToCart(@Body() addToCartDto: addToCartDto ){
        return this.cartService.add(addToCartDto)    
    }

    @ApiOkResponse({ type: UpdateCountResponse })
    @UseGuards(AuthenticatedGuard)
    @Post('/count/update')
    updateCount(@Body() updateProductCountDto: updateProductCountDto){
        return this.cartService.updateCount(updateProductCountDto)    
    }

    /*
    @UseGuards(AuthenticatedGuard)
    @Delete('/delete-one')
    removeOne(@Body() updateProductCountDto: updateProductCountDto){
        return this.cartService.remove(updateProductCountDto)    
    }
    */

    @UseGuards(AuthenticatedGuard)
    @Post('/delete-one')
    removeOne(@Body() updateProductCountDto: updateProductCountDto){
        return this.cartService.remove(updateProductCountDto)    
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/delete-all/:id')
    removeAll(@Param('id') user_id: string){
        return this.cartService.removeAll(user_id)    
    }
}
