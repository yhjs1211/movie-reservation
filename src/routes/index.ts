import userRouter from './user.routes';
import showRouter from './show.routes';
import bookRouter from './book.routes';
import timetableRouter from './timetable.routes';

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
        path : '/books',
        router : bookRouter
    },
    {
        path : '/timetable',
        router : timetableRouter
    },
];

defaultRouter.forEach(r=>{
    router.use(r.path,r.router);
});

export default router;