import { AllowNull, AutoIncrement, BelongsTo, Column, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { ReservationAttributes, ReservationCreationAttributes } from '../modelInterface'
import User from "./user.model";

@Table
export default class Reservation extends Model<ReservationAttributes,ReservationCreationAttributes>{

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id! : number;
    
    @BelongsTo(()=>User,'userId')
    user! : User;
}