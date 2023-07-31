import { Router } from "express";
import { container } from "tsyringe";
import ShowController from "../3-Layer/controller/show.controller";
import auth from "../middleware/auth";

const showController = container.resolve(ShowController);
const router = Router();

/*
GET '/shows/:showId' - getShow
GET '/shows' - getShows
GET '/shows?category=:category' - getShowsByCategory
GET '/shows?name=:name' - getShowsByName
POST '/shows' - createShow
DELETE '/shows' - closeShow
 */

router.get('/:showId',showController.getShowByShowId)

router.route('')
.get(showController.getShows)
.post(auth.verifyUser,showController.createShow)
.patch(auth.verifyUser)
.delete(auth.verifyUser,showController.deleteShow)

router.get('/:showId');


export default router;