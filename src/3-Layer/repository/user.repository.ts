import { singleton } from "tsyringe";
import dbConnector from "../../database/db";
import User from "../../database/model/user.model";
import { Op } from "sequelize";
import {ResponseData} from "../../types/response"

@singleton()
export default class UserRepository{
    private userRepository = dbConnector.sq.getRepository(User);
    private transaction = dbConnector.getTransaction();

    async createUser(isAdmin : boolean, name : string, nickname : string, mobile : string, password : string) : Promise<ResponseData>{
        let user = null;

        try {
            await this.userRepository.create({isAdmin, name, nickname, mobile, password});
            user = await this.userRepository.findOne({
                where:{
                    [Op.and]:{ mobile, nickname }
                }
            });
            return {isSuccessful : true, data:user};
        } catch (e) {
            console.error(e);
            return {isSuccessful : false, data:user};
        }
    }

    async findById(userId : string) : Promise<ResponseData<User>>{
        let user = null;
        try {
            user = await this.userRepository.findByPk(userId);    
            return {isSuccessful : true, data:user};
        } catch (e) {
            console.error(e);
            return {isSuccessful : false, data:user};
        }
    }

    async findByNickname ( nickname : string ) : Promise<User | null>{
        let user = null;
        try {
            user = await this.userRepository.findOne({where:{nickname}});
            return user;
        } catch (e) {
            console.error(e);
            return user;
        }
    }

    async updateUser ( id : string, )
}