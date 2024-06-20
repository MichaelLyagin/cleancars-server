import { Injectable } from '@nestjs/common';
import { OrderItem } from './order-item.model';
import { InjectModel } from '@nestjs/sequelize';
import { createOrderItemDto, checkOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectModel(OrderItem)
        private orderItemModel: typeof OrderItem,
    ){}

    //Нахождение всех элементов заказа по id заказа
    async findAll(order_id: number | string): Promise<OrderItem[]>{
        return this.orderItemModel.findAll({where: { order_id: order_id }})
    }

    //Метод создания элемента заказа
    async create(createOrderItemDto: createOrderItemDto): Promise<OrderItem | {warningMessage: string}>{
        const orderItem = new OrderItem();

        orderItem.order_id = createOrderItemDto.order_id;
        orderItem.product_id = createOrderItemDto.product_id;
        orderItem.quantity = createOrderItemDto.quantity;
        orderItem.price = createOrderItemDto.price;

        return orderItem.save();
    }

    //Метод проверки заказал ли пользователь товар
    async check(checkOrderItemDto: checkOrderItemDto): Promise<OrderItem[] | {warningMessage: string}>{
    const orderItems = this.orderItemModel.findAll({where: { order_id: checkOrderItemDto.order_id, product_id: checkOrderItemDto.product_id }});

    return orderItems;
    }
}
