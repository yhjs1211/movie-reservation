import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { BookAttributes, BookCreationAttributes } from '../modelInterface'
import User from "./user.model";
import Show from "./show.model";
import BookShow from "./book_show.model";

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

    @BelongsToMany(()=>Show, ()=>BookShow)
    shows! : Show[];
}