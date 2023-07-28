import { Optional } from "sequelize";
import { AllowNull, AutoIncrement, Column, Default, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import {UserAttributes, UserCreationAttributes} from '../modelInterface';
import Reservation from "./reservation.model";

@Table
export default class User extends Model<UserAttributes,UserCreationAttributes>{

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    id! : number;
    
    @AllowNull(false)
    @Column
    isAdmin! : boolean;

    @AllowNull(false)
    @Column
    name! : string;

    @AllowNull(false)
    @Column
    password! : string;

    @AllowNull(false)
    @Unique
    @Column
    nickname! : string;

    @AllowNull(false)
    @Unique
    @Column
    mobile! : string;

    @AllowNull(true)
    @Default(0)
    @Column
    point? : number;

    @HasMany(() => Reservation,'userId')
    reservations! : Reservation[];
}