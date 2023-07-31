import { singleton } from "tsyringe";
import TimetableService from "../service/timetableService";
import { Request, Response } from "express";

@singleton()
export default class TimetableController {
    private timetableService = new TimetableService();

    getTimetableOnDate = async (req :Request, res : Response) : Promise<void> => {
        const id = req.query.id as string;
        const date = req.query.date as string;
        const result = await this.timetableService.findTimetableOnDate( id, date );
        
        if(result.isSuccessful){
            res.status(200).json({
                timetable : result.data
            });
        }else{
            res.status(500).json({
                message : "데이터 조회에 실패하였습니다."
            })
        }
    }

    createTimetable = async (req :Request, res : Response) : Promise<void> => {
        const id = req.query.id as string;
        const date = req.query.date as string;
        const timetable : string = req.body.timetable;

        const result = await this.timetableService.createTimetable(id,date,timetable);

        if(result.isSuccessful){
            res.status(200).json({
                timetable : result.data
            });
        }else{
            res.status(500).json({
                message : "데이터 생성에 실패하였습니다."
            })
        }
    }

    updateTimetable = async (req :Request, res : Response) : Promise<void> => {
        const id = req.query.id as string;
        const date = req.query.date as string;
    }

    deleteTimetable = async (req :Request, res : Response) : Promise<void> => {
        const id = req.query.id as string;
        const date = req.query.date as string;
    }
}