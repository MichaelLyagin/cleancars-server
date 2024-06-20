import { ForbiddenException, Injectable } from '@nestjs/common';
import { MakePaymentDto } from './dto/make-payment.dto';
import axios from 'axios';
import { CheckPaymentDto } from './dto/check-payment.dto';

@Injectable()
export class PaymentService {
    
    //Метод оплаты
    async makePayment(makePaymentDto: MakePaymentDto) {
        try {
            const { data } = await axios({
              method: 'POST',
              url: 'https://api.yookassa.ru/v3/payments',
              headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Date.now(), //уникальный id каждого запроса
              },
              auth: {
                username: '392994',
                password: 'test_xNhu076F33Cat3IxIwU2f1-x4fotL6NuGufF24s-J0U',
              },
              data: {
                amount: {
                  value: makePaymentDto.amount,//приходит с фронта
                  currency: 'RUB',
                },
                capture: true,
                confirmation: {
                  type: 'redirect',
                  return_url: 'http://localhost:3001/makeorder', //после деплоя нужно поправить заменить
                },
                description: makePaymentDto.description,
              },
            });
      
            return data; // в data ответ от платежной системы в виде json
            } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    async checkPayment(checkPaymentDto: CheckPaymentDto) {
        try {
          const { data } = await axios({
            method: 'GET',
            url: `https://api.yookassa.ru/v3/payments/${checkPaymentDto.paymentId}`,
            auth: {
              username: '392994',
              password: 'test_xNhu076F33Cat3IxIwU2f1-x4fotL6NuGufF24s-J0U',
            },
          });
    
          return data;
        } catch (error) {
          throw new ForbiddenException(error);
        }
      }
}
