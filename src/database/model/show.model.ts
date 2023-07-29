import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { ShowCategory, ShowAttributes, ShowCreationAttributes } from '../modelInterface';
import Book from "./book.model";
import BookShow from "./book_show.model";
import Timetable from "./timetable.model";


@Table
export default class Show extends Model<ShowAttributes,ShowCreationAttributes>{
    
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id! : number;

    @AllowNull(false)
    @Unique
    @Column
    name! : string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    detail! : string;

    @AllowNull(true)
    @Default(null)
    @Column
    image? : string;

    @AllowNull(false)
    @Column(DataType.ENUM('Movie','Festival','Musical','Concert'))
    category! : ShowCategory

    @AllowNull(false)
    @Column
    location! : string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    period! : string;

    @BelongsToMany(()=>Book, ()=>BookShow)
    books! : Book[];

    @HasMany(()=>Timetable)
    timetable! : Timetable[];
}