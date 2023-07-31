import { Router } from "express";
import { container } from "tsyringe";
import TimetableController from "../3-Layer/controller/timetable.controller";
import auth from "../middleware/auth";

const timetableController = container.resolve(TimetableController);
const router = Router();

/*
    GET '/timetable?id=:showId&date=:date' - getTimetableOnDate
    POST '/timetable?id=:showId&date=:date' - createTimetable
    PATCH '/timetable?id=:showId&date=:date' - updateTimetable
    DELETE '/timetable?id=:showId&date=:date' - deleteTimetable
*/

router.route('')
.get(timetableController.getTimetableOnDate)
.post(auth.verifyUser,timetableController.createTimetable)
.patch(auth.verifyUser,timetableController.updateTimetable)
.delete(auth.verifyUser,timetableController.deleteTimetable)

export default router;