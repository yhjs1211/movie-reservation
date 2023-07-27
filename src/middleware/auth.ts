import jwt from 'jsonwebtoken';
import { config } from '../config';

class Auth{
    private jwt = jwt;

    public getToken() : string {
        return '';
    }
}