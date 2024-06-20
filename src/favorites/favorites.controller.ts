import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { addToFavoritesDto } from './dto/add-to-favorites.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { AddToFavoritesResponse, GetAllResponse } from './types';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService){}

    @ApiOkResponse({ type: [GetAllResponse] })
    @UseGuards(AuthenticatedGuard)
    @Get('/:id')
    getAll(@Param('id') user_id: string ){
        return this.favoritesService.findAll(user_id)    
    }

    @ApiOkResponse({ type: AddToFavoritesResponse })
    @UseGuards(AuthenticatedGuard)
    @Post('/add')
    addToCart(@Body() addToFavoritesDto: addToFavoritesDto ){
        return this.favoritesService.add(addToFavoritesDto)    
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
    removeOne(@Body() addToFavoritesDto: addToFavoritesDto){
        return this.favoritesService.remove(addToFavoritesDto)    
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/delete-all/:id')
    removeAll(@Param('id') user_id: string){
        return this.favoritesService.removeAll(user_id)    
    }
}