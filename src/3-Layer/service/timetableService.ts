import { singleton } from "tsyringe";
import TimetableRepository from "../repository/timetable.repository";

@singleton()
export default class TimetableService{
    private timetableRepository = new TimetableRepository();

    findTimetableOnDate( id : string , date : string ){
        return this.timetableRepository.findTimetableOnDate(id,date);
    };

    findTimetableDetail( id : string, date : string, time : string){
        return this.timetableRepository.findTimetableDetail( id, date, time);
    }

    createTimetable( id : string, date : string, timetable : string ){
        return this.timetableRepository.createTimetable(id, date, timetable);
    }
}