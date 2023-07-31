import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { TimetableAttributes, TimetableCreationAttributes } from "../modelInterface";
import Show from "./show.model";
import Seat from "./seat.model";

@Table
export default class Timetable extends Model<TimetableAttributes,TimetableCreationAttributes>{
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    id! : number;

    @AllowNull(false)
    @Column(DataType.STRING)
    date! : string;

    @AllowNull(false)
    @Column(DataType.STRING)
    time! : string;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    isFilled! : boolean;

    @ForeignKey(()=>Show)
    @Column(DataType.INTEGER)
    showId! : number;

    @BelongsTo(()=>Show)
    show! : Show;

    @HasMany(()=>Seat)
    seats! : Seat[];
}