import { Request, Response } from "express";
import { container, singleton } from "tsyringe";
import BookService from "../service/bookService";

const bookService = container.resolve(BookService);

@singleton()
export default class BookController{
    private bookService = bookService;

    getBooks = async (req :Request, res : Response) : Promise<void> => {
        const userId = res.locals.userId;

        const result = await this.bookService.findAllBooks(userId);

        if(result.isSuccessful){
            res.status(200).json({
                isSuccessful : result.isSuccessful,
                data : result.data
            });
        }else{
            res.status(500).json({
                message : "예약 내역 조회에 실패하였습니다."
            });
        }
    };

    createBook = async (req :Request, res : Response) : Promise<void> => {
        const userId = res.locals.userId;
        const seatId = req.body.seatId as string;

        const result = await this.bookService.createBook(seatId,userId);

        if(result.isSuccessful){
            res.status(200).json({
                data : result.data
            });
        }else{
            res.status(400).json({
                message : result.data
            });
        }
    };
}