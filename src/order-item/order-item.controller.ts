import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { createOrderItemDto, checkOrderItemDto } from './dto/create-order-item.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetAllResponse } from './types';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('order-item')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService){}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createOrder(@Body() createOrderItemDto: createOrderItemDto){
        return this.orderItemService.create(createOrderItemDto);//Создание элемента заказа
    }

    @ApiOkResponse({ type: [GetAllResponse] })
    @UseGuards(AuthenticatedGuard)
    @Get('/:id')
    getAll(@Param('id') order_id: string ){
        return this.orderItemService.findAll(order_id)    
    }

    @Post('/check')
    @ApiOkResponse({ type: [GetAllResponse] })
    @UseGuards(AuthenticatedGuard)
    @Header('Content-type', 'application/json')
    check(@Body() checkOrderItemDto: checkOrderItemDto){
        return this.orderItemService.check(checkOrderItemDto);//Проверка заказал ли пользователь товар
    }
}
