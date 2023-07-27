import "reflect-metadata"
import { container, singleton } from "tsyringe";
import UserService from "../service/userService";
import { Request, Response, NextFunction } from "express";

const userService = container.resolve(UserService);

@singleton()
export default class UserController{
    private userService = userService;

    signup = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const result = await this.userService.createUser(req.body);

        if(result.isSuccessful){
            res.status(200).json({
                result:result.data,
                message:"유저 생성 완료"
            })
        }else{
            res.status(200).json({
                result:result.data,
                message:"유저 생성 실패"
            })
        }
    }
}