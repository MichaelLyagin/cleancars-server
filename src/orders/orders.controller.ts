import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from './dto/create-order.dto';
import { GetAllResponse } from './types';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createOrder(@Body() createOrderDto: createOrderDto){
        return this.ordersService.create(createOrderDto);//Создание нового товара
    }

    @ApiOkResponse({ type: [GetAllResponse] })
    @UseGuards(AuthenticatedGuard)
    @Get('/:id')
    getAll(@Param('id') client_id: string ){
        return this.ordersService.findAll(client_id)    
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/status/:id')
    updateStatus(@Param('id') id: string ){
        return this.ordersService.updateStatus(id)    
    }

}
