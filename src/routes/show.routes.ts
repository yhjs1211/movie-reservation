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

 */

router.route('/')
.get()
.post()
.patch()
.delete()

router.get('/:showId');


export default router;