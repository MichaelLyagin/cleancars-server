import { Injectable } from '@nestjs/common';
import { Review } from './review.model';
import { InjectModel } from '@nestjs/sequelize';
import { createReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review)
        private reviewModel: typeof Review,
    ){}

    //Нахождение всех отзывов по id товара
    async findAll(product_id: number | string): Promise<Review[]>{
        return this.reviewModel.findAll({where: { product_id: product_id }})
    }

    //Метод создания отзыва
    async create(createReviewDto: createReviewDto): Promise<Review | {warningMessage: string}>{
        const review = new Review();

        review.product_id = createReviewDto.product_id;
        review.client_id = createReviewDto.client_id;
        review.date = createReviewDto.date;
        review.rating = createReviewDto.rating;
        review.comment = createReviewDto.comment;

        return review.save();
    }

    //Метод удаления отзыва
    async deleteReview(id: number | string): Promise<void>{
        const review = await this.reviewModel.findOne({where: {id: Number(id)}}); //Продукт на удаление
        
        await review.destroy();
    }
}
