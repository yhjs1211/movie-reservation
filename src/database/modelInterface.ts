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
    NoCategory = "None",
    Movie = "Movie",
    Festival = "Festival",
    Musical = "Musical",
    Concert = "Concert",
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

// Book
export interface BookAttributes{
    id : number;
    userId : number;
}

export interface BookCreationAttributes extends Optional<BookAttributes,'id'>{};

// Timetable
export interface TimetableAttributes{
    id : string;
    date : string;
    isFilled : boolean;
    showId : number;
}

export interface TimetableCreationAttributes extends Optional<TimetableAttributes,'id'>{};

// Seat
export interface SeatAttributes{
    id : number;
    grade : string;
    price : number;
    isBooked : boolean;
    timetableId : string;
}

export interface SeatCreationAttributes extends Optional<SeatAttributes,'id'>{};