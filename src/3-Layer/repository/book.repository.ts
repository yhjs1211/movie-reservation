import { singleton } from "tsyringe";
import Book from "../../database/model/book.model";
import dbConnector from "../../database/db";
import { ResponseData } from "../../types/response";
import Seat from "../../database/model/seat.model";
import Timetable from "../../database/model/timetable.model";
import Show from "../../database/model/show.model";
import User from "../../database/model/user.model";


@singleton()
export default class BookRepository{
    private sq = dbConnector.sq;

    async findAllBooks( userId : string ) : Promise<ResponseData<Book>>{
        try {
            const data = await Book.findOne({
                where : {
                    userId
                },
                include : {
                    model : Seat,
                    as : '예매내역'
                },
                attributes : []
            });
            
            const result = {
                isSuccessful : true,
                data
            }
            return result;
        } catch (e) {
            console.error(e);
            const result = {
                isSuccessful : false,
                data : null
            }
            return result;
        }
    };

    findBookDetail(){

    };

    async createBook( seatId : string, userId : string ){
        const transaction = await this.sq.transaction();
        try {
            const book = await Book.findByPk(userId,{
                include:{
                    model : Seat,
                    as : '예매내역'
                }
            });
            const user = await User.findByPk(userId);
            const seat = await Seat.findByPk(seatId,{
                include:[{
                    model : Timetable,
                    include:[{
                        model : Show
                    }]
                }]
            });

            if(seat && book && user){
                if(!await book.$has('예매내역',seat)){
                    if(user.point >= seat.price){
                        await seat.update({isBooked:true},{transaction});
                        await book.$add('예매내역',seat,{transaction});
                        await user.update({point:user.point-seat.price},{transaction});
                    }else{
                        throw new Error('포인트 부족')
                    }
                }else{
                    throw new Error('이미 예매된 내역입니다.')
                }
            }

            await transaction.commit();

            const result = {
                isSuccessful : true,
                data : seat
            }
            return result;
        } catch (e : any) {
            console.error(e);
            
            await transaction.rollback();
            const result = {
                isSuccessful : false,
                data : e.message
            }
            return result;
        }
    };

    deleteBook(){}
}