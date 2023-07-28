import { Request, Response,  NextFunction } from "express";
import Joi from "joi";
import {UserInfo, LoginInfo, UpdateInfo} from '../types/user'

class Validate{
    private joi = Joi;

    signup = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const schema = this.joi.object<UserInfo>({
            name : this.joi.string().required(),
            isAdmin : this.joi.boolean().required(),
            mobile : this.joi.string().custom((num : string)=>{
                num.split('-').forEach(v=>{
                    if ( Number.isNaN (Number(v)) ) throw new Error('올바른 숫자를 입력해주세요.');
                });
            }),
            nickname : this.joi.string().max(15).required(),
            password : this.joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).required()
        });

        const { error } = schema.validate(req.body);
        if(error){
            res.status(400).json({
                isSuccessful : false,
                error:error.message
            });
            return;
        }
        next();
    };

    login = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const schema = this.joi.object<LoginInfo>({
            nickname : this.joi.string().max(15).required(),
            password : this.joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).required()
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