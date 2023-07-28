import { CharDataType, IntegerDataType, Optional, StringDataType, TextDataType } from "sequelize";

// User
export interface UserAttributes{
    id : IntegerDataType;
    isAdmin : boolean;
    name : StringDataType;
    nickname : StringDataType;
    mobile : StringDataType;
    point? : IntegerDataType;
    password : StringDataType;
};

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {};

// Show
export enum ShowCategory{
    Movie,
    Festival,
    Musical,
    Concert
}

export interface ShowAttributes{
    id : IntegerDataType;
    name : StringDataType;
    detail : TextDataType;
    image? : StringDataType;
    category : ShowCategory;
    location : StringDataType;
    period : TextDataType;
}

export interface ShowCreationAttributes extends Optional<ShowAttributes, 'id'> {};

// Reservation
export interface ReservationAttributes{
    id : IntegerDataType;
    userId : IntegerDataType;
}

export interface ReservationCreationAttributes extends Optional<ReservationAttributes,'id'>{};

// Timetable
export interface TimetableAttributes{
    id : StringDataType;
    date : StringDataType;
    isFilled : boolean;
    showId : number;
}

export interface TimetableCreationAttributes extends Optional<TimetableAttributes,'id'>{};

// Seat
export interface SeatAttributes{
    id : IntegerDataType;
    grade : CharDataType;
    price : IntegerDataType;
    isBooked : boolean;
    timetableId : StringDataType;
}

export interface SeatCreationAttributes extends Optional<SeatAttributes,'id'>{};