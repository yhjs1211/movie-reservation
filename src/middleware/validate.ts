import { Request, Response,  NextFunction } from "express";
import Joi from "joi";
import {UserInfo, LoginInfo, UpdateInfo} from '../types/user'

class Validate{
    private joi = Joi;

    login = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const schema = this.joi.object<LoginInfo>({
            nickname:this.joi.string().max(15).required(),
            password:this.joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).required()
        });

        const { error } = schema.validate(req.body);
        if(error){
            res.status(400).json({
                isSuccessful : false,
                error:error.details
            });
            return;
        }
        next();
    }
}

const validator = new Validate();

export default validator;