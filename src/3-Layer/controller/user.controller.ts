import "reflect-metadata"
import { container, singleton } from "tsyringe";
import UserService from "../service/userService";
import { Request, Response } from "express";

const userService = container.resolve(UserService);

@singleton()
export default class UserController{
    private userService = userService;

    signup = async (req :Request, res : Response) : Promise<void> => {
        const result = await this.userService.createUser(req.body);

        if(result.isSuccessful){
            res.status(200).json({
                result:result.data,
                message:"유저 생성 완료"
            })
        }else{
            res.status(400).json({
                result:result.data,
                message:"유저 생성 실패"
            })
        }
    };

    login = async (req :Request, res : Response) : Promise<void> => {
        const result = await this.userService.login(req.body);
        if(result){
            res.cookie('Authorization',result,{path:'/',httpOnly:true});
            res.status(200).json({
                token:result,
                message:"로그인 성공"
            })
        }else{
            res.status(400).json({
                message:"로그인 실패"
            })
        }
    };

    logout = (req :Request, res : Response) : void => {
        res.clearCookie('Authorization');
        res.status(200).json({
            message : "로그아웃 되었습니다."
        });
    }

    getProfile = (req :Request, res : Response) : void => {
        const userId : string = res.locals.userId;
        this.userService.findById(userId)
            .then(d=>{
                res.status(200).json({
                    user:d
                })
            })
            .catch(()=>{
                res.status(404).json({
                    message:"존재하지 않는 회원입니다."
                })
            });
    };

    updateProfile = async (req :Request, res : Response) : Promise<void> => {
        const userId : string = res.locals.userId;

        const result = await this.userService.updateUser(userId,req.body);

        if(result){
            if(result.isSuccessful){
                res.status(200).json({
                    result:result.data,
                    message:"업데이트 완료"
                })
            }else{
                res.status(400).json({
                    message:"업데이트 실패"
                });
            }
        }else{
            res.status(400).json({
                message:"업데이트 정보를 입력해주세요."
            });
        }
    };

    withdrawUser = async (req :Request, res : Response) : Promise<void> => {
        const userId : string = res.locals.userId;

        const result = await this.userService.deleteUser(userId, req.body);

        if(result){
            res.clearCookie('Authorization');
            res.status(200).json({
                isSuccessful : result.isSuccessful,
                message:result.message
            });
        }else{
            res.status(400).json({
                message:"회원 삭제 실패"
            });
        }
    };

    updatePoint = async (req :Request, res : Response) : Promise<void> => {
        const userId : string = res.locals.userId;
        const point : number = Number(req.body.point);
        const result = await this.userService.updatePoint(userId,point);
        if(result){
            res.status(200).json({
                isSuccessful : true,
                updatedUser : result
            });
        }else{
            res.status(500).json({
                message:"포인트 수정 실패"
            });
        }
    }
}