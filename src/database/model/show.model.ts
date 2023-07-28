import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { ShowCategory, ShowAttributes, ShowCreationAttributes } from '../modelInterface';


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
}