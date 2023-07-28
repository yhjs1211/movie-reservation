import userRouter from './user.routes';
import showRouter from './show.routes';
import reservationRouter from './reservation.routes';

import { Router } from 'express';

const router = Router();

const defaultRouter = [
    {
        path : '/users',
        router : userRouter
    },
    {
        path : '/shows',
        router : showRouter
    },
    {
        path : '/reservations',
        router : reservationRouter
    }
];

defaultRouter.forEach(r=>{
    router.use(r.path,r.router);
});

export default router;