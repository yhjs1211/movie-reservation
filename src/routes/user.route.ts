import { Router } from "express";
import UserController from "../3-Layer/controller/user.controller";
import { container } from "tsyringe";
import auth from "../middleware/auth";

/*
    GET '/users/me' 개인정보 조회
    POST '/users' 회원가입
    PATCH '/users?id' 회원정보 수정
    DELETE '/users?id' 회원탈퇴
    POST '/users/login' 로그인
    GET '/users/logout' 로그아웃
*/
const usercontroller = container.resolve(UserController);
const router = Router();

router.get('/me',auth.verifyUser,usercontroller.getProfile);

router.post('/login',usercontroller.login);

router.get('/logout');

router.route('/')
.post(usercontroller.signup)
.patch(auth.verifyUser)
.delete(auth.verifyUser)

export default router;