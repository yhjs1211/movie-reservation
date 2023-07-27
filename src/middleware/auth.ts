import { Request, Response, NextFunction } from 'express';
import jwt, { Jwt, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { config } from '../config';
import User from "../database/model/user.model";

type Token = {
    userId : number,
    isAdmin : boolean
};

class Auth{
    private jwt = jwt;

    public getToken(userId:number, isAdmin:boolean) : string {
        
        const payload : Token = {
            userId,
            isAdmin
        };

        const token : string =
            'Bearer ' + this.jwt.sign(payload, config.jwt.SecretKey, { expiresIn : config.jwt.ExpiresIn });

        return token;
    }
    
    public verifyUser =  async (req :Request, res : Response, next : NextFunction) : Promise<void> => {
        const authorization = req.cookies.Authorization;

        const token : string = authorization?.split(' ')[1];

        const payload = this.decodeToken(token);

        res.locals.userId = payload?.userId;
        res.locals.isAdmin = payload?.isAdmin;
        next();
    };

    public decodeToken = (token : string) : any =>{
        try {
            const payload : any = jwt.verify(token, config.jwt.SecretKey);
            return payload;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

}

const auth = new Auth();

export default auth;