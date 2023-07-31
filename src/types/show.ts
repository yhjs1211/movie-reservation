import { ShowCategory } from "../database/modelInterface";

export type ShowInfo = {
    name : string;
    detail : string;
    image? : string;
    category : ShowCategory;
    location : string;
    period : string;
};

export type CreateShowInfo = {
    name : string;
    detail : string;
    image? : string;
    category : string;
    location : string;
    start : string;
    end : string;   
}