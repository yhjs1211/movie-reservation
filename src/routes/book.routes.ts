import { Router } from "express";
import auth from "../middleware/auth";
import { container } from "tsyringe";
import BookController from "../3-Layer/controller/book.controller";

const router = Router();
const bookController = container.resolve(BookController);

/**
    GET '/books' 예약 내역 조회
    GET '/books/:bookId' 예약 디테일 조회
    POST '/books' 예약 추가
    DELETE '/books?id=:showId' 예약 삭제
 */

    router.get('/:bookId',auth.verifyUser)

    router.route('')
    .get(auth.verifyUser,bookController.getBooks)
    .post(auth.verifyUser,bookController.createBook)
    .delete(auth.verifyUser,)
export default router;