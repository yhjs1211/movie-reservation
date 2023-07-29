import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Book from "./book.model";
import Show from "./show.model";


@Table({
    timestamps:false
})
export default class BookShow extends Model{
    @ForeignKey(()=>Book)
    @Column
    bookId! : number;

    @ForeignKey(()=>Show)
    @Column
    showId! : number;
}