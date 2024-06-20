import { Injectable } from '@nestjs/common';
import { Orders } from './orders.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { createOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders)
        private orderModel: typeof Orders,
    ){}

    //Нахождение всех заказов по id пользователя
    async findAll(client_id: number | string): Promise<Orders[]>{
        return this.orderModel.findAll({where: { client_id }})
    }

    //Метод создания заказа
    async create(createOrderDto: createOrderDto): Promise<Orders | {warningMessage: string}>{
        const order = new Orders();

        order.client_id = createOrderDto.client_id;
        order.order_date = createOrderDto.order_date;
        order.address = createOrderDto.address;
        order.status = createOrderDto.status;
        order.payment_method = createOrderDto.payment_method;
        order.departure_date = createOrderDto.departure_date;
        order.arrival_date = createOrderDto.arrival_date;

        return order.save();
    }

    //Метод обновления количества товаров в корзине
    async updateStatus(id: number | string): Promise<Orders | {warningMessage: string}>{
        await this.orderModel.update({ status: '1'}, {where: {id: id}})
        
        const order = await this.orderModel.findOne({where: {id: id}})
        
        return order;
    }
}
