import { container, singleton } from "tsyringe";
import BookRepository from "../repository/book.repository";

const bookRepository = container.resolve(BookRepository);

@singleton()
export default class BookService{
    private bookRepository = bookRepository;

    findAllBooks( userId : string ){
        return this.bookRepository.findAllBooks(userId);
    };

    createBook(seatId : string, userId : string){
        return this.bookRepository.createBook(seatId,userId);
    }
}