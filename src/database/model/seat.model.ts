import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { SeatAttributes, SeatCreationAttributes } from "../modelInterface";
import Timetable from "./timetable.model";

@Table
export default class Seat extends Model<SeatAttributes,SeatCreationAttributes>{
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id! : number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    seatNumber! : number;

    @AllowNull(false)
    @Column(DataType.STRING(10))
    grade! : string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    price! : number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    isBooked! : boolean;

    @ForeignKey(()=>Timetable)
    @Column(DataType.INTEGER)
    timetableId! : number;

    @BelongsTo(()=>Timetable)
    timetable! : Timetable;
}