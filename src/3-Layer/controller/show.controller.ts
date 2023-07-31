import "reflect-metadata";
import { container, singleton } from "tsyringe";
import ShowService from "../service/showService";
import { Request, Response, NextFunction } from "express";
import Show from "../../database/model/show.model";

const showService = container.resolve(ShowService);

@singleton()
export default class ShowController{
    private showService = showService;

    getShows = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        let result;
        const category = req.query.category as string;
        const name = req.query.name as string;
        
        category != undefined ? result = await this.showService.getShowsByCategory(category) 
        : name != undefined ? result = await this.showService.getShowsByName(name)
        : result = await this.showService.getShows();

        if(result.isSuccessful){
            res.status(200).json({
                isSuccessful : result.isSuccessful,
                data : result.data
            });
        }else{
            res.status(400).json({
                isSuccessful : result.isSuccessful,
                data : "공연 조회에 실패하였습니다."
            });
        }
    };

    getShowByShowId = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const id = req.params.showId;
        
        const result = await this.showService.getShowByShowId(id);

        if(result.isSuccessful){
            res.status(200).json({
                isSuccessful : result.isSuccessful,
                data : result.data
            });
        }else{
            res.status(400).json({
                isSuccessful : result.isSuccessful,
                data : "공연 조회에 실패하였습니다."
            });
        }
    };

    createShow = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const isAdmin= res.locals.isAdmin;
        
        if(isAdmin){
            const result = await this.showService.createShow(req.body);
            if(result.isSuccessful){
                res.status(200).json({
                    isSuccessful : result.isSuccessful,
                    data : result.data
                });
            }else{
                res.status(500).json({
                    message : "공연 생성에 실패하였습니다."
                });
            }
        }else{
            res.status(400).json({
                message : "관리자만 등록할 수 있습니다."
            });
        }
    };

    deleteShow = async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const isAdmin= res.locals.isAdmin;
        const showId = req.query.id as string;
        
        if(isAdmin){
            const result = await this.showService.deleteShow(showId);
            if(result != null){
                if(result == 1){
                    res.status(200).json({
                        isSuccessful : true,
                        message: "삭제되었습니다."
                    }); 
                }else if(result == 0){
                    res.status(404).json({
                        isSuccessful : false,
                        message: "존재하지 않는 공연입니다."
                    });
                }
            }else{
                res.status(500).json({
                    message : "공연 삭제에 실패하였습니다."
                });
            }
        }else{
            res.status(400).json({
                message : "관리자만 삭제할 수 있습니다."
            });
        }
    }
}