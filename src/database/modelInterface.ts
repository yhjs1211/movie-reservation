import { Optional } from "sequelize";

// User
export interface UserAttributes{
    id : number;
    isAdmin : boolean;
    name : string;
    nickname : string;
    mobile : string;
    point? : number;
    password : string;
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
    id : number;
    name : string;
    detail : string;
    image? : string;
    category : ShowCategory;
    location : string;
    period : string;
}

export interface ShowCreationAttributes extends Optional<ShowAttributes, 'id'> {};

// Reservation

export interface ReservationAttributes{
    id : number;
    userId : number;
}

export interface ReservationCreationAttributes extends Optional<ReservationAttributes,'id'>{};