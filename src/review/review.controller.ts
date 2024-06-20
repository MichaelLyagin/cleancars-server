import { ReviewService } from './review.service';
import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { GetAllResponse } from './types';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { createReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService){}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createReview(@Body() createReviewDto: createReviewDto){
        return this.reviewService.create(createReviewDto);//Создание отзыва
    }

    @ApiOkResponse({ type: [GetAllResponse] })
    @Get('/:id')
    getAll(@Param('id') product_id: string ){
        return this.reviewService.findAll(product_id)    
    }

    //Удаление отзыва
    @UseGuards(AuthenticatedGuard)
    @Post('/delete/:id')
    deleteReview(@Param('id') id: string){
        return this.reviewService.deleteReview(id)    
    }
}
