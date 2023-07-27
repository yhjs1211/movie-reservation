import userRouter from './user.route';
import showRouter from './show.route';

import { Router } from 'express';

const router = Router();

const defaultRouter = [
    {
        path:'/users',
        router:userRouter
    },
    {
        path:'/shows',
        router:showRouter
    }
];

defaultRouter.forEach(r=>{
    router.use(r.path,r.router);
});

export default router;