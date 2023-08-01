import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, Default, DefaultScope, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { BookAttributes, BookCreationAttributes } from '../modelInterface'
import User from "./user.model";
import Seat from "./seat.model";
import BookSeat from "./book_seat.model";

@Table
export default class Book extends Model<BookAttributes,BookCreationAttributes>{

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id! : number;

    @ForeignKey(()=>User)
    @Column
    userId! : number;
    
    @BelongsTo(()=>User)
    user! : User;

    @BelongsToMany(()=>Seat, ()=>BookSeat)
    예매내역! : Seat[];
}