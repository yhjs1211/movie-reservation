import { AllowNull, AutoIncrement, Column, Default, HasMany, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import {UserAttributes, UserCreationAttributes} from '../modelInterface';
import Book from "./book.model";


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
    point! : number;

    @HasOne(() => Book)
    book! : Book;
}