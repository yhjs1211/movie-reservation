import { Router } from "express";

const router = Router();

/**
    GET '/books' 예약 내역 조회
    POST '/books' 예약 추가
    PATCH '/books?id=:showId' 예약 수정
    DELETE '/books?id=:showId' 예약 삭제
 */

export default router;