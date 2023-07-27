import { singleton } from "tsyringe";
import dbConnector from "../../database/db";
import User from "../../database/model/user.model";
import { Op } from "sequelize";

type ResponseData = {
    isSuccessful : boolean,
    data : User | null
}

@singleton()
export default class UserRepository{
    private userRepository = dbConnector.sq.getRepository(User);
    private transaction = dbConnector.getTransaction();

    async createUser(isAdmin : boolean, name : string, nickname : string, mobile : string) : Promise<ResponseData>{
        let user = null;
        try {
            await this.userRepository.create({isAdmin,name,nickname,mobile});
            user = await this.userRepository.findOne({
                where:{
                    [Op.and]:{ mobile, nickname }
                }
            });
        } catch (e) {
            console.error(e);
            return {isSuccessful : false, data:user};
        }
        return {isSuccessful : true, data:user};   
    }
}