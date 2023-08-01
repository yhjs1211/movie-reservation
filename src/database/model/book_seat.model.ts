import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Book from "./book.model";
import Seat from "./seat.model";


@Table({
    timestamps:false,
    tableName:'Book_Seat'
})
export default class BookSeat extends Model{
    @ForeignKey(()=>Book)
    @Column
    bookId! : number;

    @ForeignKey(()=>Seat)
    @Column
    seatId! : number;
}