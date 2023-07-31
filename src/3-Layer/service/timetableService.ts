import { singleton } from "tsyringe";
import TimetableRepository from "../repository/timetable.repository";

@singleton()
export default class TimetableService{
    private timetableRepository = new TimetableRepository();

    findTimetableOnDate( id : string , date : string ){
        return this.timetableRepository.findTimetableOnDate(id,date);
    };

    createTimetable( id : string, date : string, timetable : string ){
        return this.timetableRepository.createTimetable(id, date, timetable);
    }
}