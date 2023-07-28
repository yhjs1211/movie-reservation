import { Router } from "express";
import { container } from "tsyringe";
import ShowController from "../3-Layer/controller/show.controller";

const showController = container.resolve(ShowController);
const router = Router();

/**

GET '/shows' - getShows
POST '/shows' - createShow
PATCH '/shows' - updateShow
DELETE '/shows' - closeShow
GET '/shows/:showId' - getShow
POST '/shows/:showId' - 

 */

router.route('/')
.get()
.post()
.patch()
.delete()

router.route('/:showId')
.get()
.post()

export default router;