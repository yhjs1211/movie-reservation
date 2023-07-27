import { Router } from "express";
import UserController from "../3-Layer/controller/user.controller";
import { container } from "tsyringe";

const usercontroller = container.resolve(UserController);

const router = Router();

router.post('/',usercontroller.signup);

export default router;