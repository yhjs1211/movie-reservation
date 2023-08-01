import { singleton } from "tsyringe";
import dbConnector from "../../database/db";
import User from "../../database/model/user.model";
import { Op } from "sequelize";
import {ResponseData} from "../../types/response"
import { UpdateInfo } from "../../types/user";
import Book from "../../database/model/book.model";



@singleton()
export default class UserRepository{
    private sq = dbConnector.sq;
    private userRepository = dbConnector.sq.getRepository(User);

    async createUser(isAdmin : boolean, name : string, nickname : string, mobile : string, password : string) : Promise<ResponseData<User>>{
        const transaction = await this.sq.transaction();
        try {
            const user = await User.create({
                isAdmin,
                name,
                nickname,
                mobile,
                password
            },{transaction}); 

            await Book.create({userId:user.id},{transaction});

            await transaction.commit();
            return {isSuccessful : true, data : user};
        } catch (e) {
            console.error(e);
            await transaction.rollback();
            return {isSuccessful : false, data : null};
        }
    }

    async findById(userId : string) : Promise<User | null>{
        try {
            const user = await this.userRepository.findByPk(userId);    
            return user;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async findByNickname ( nickname : string ) : Promise<User | null>{
        try {
            const user = await this.userRepository.findOne({where:{nickname}});
            return user;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    async updateUser ( user : User, data : UpdateInfo) : Promise<ResponseData<User>>{
        try {
            if(user){
                await user.update(data);
                return {isSuccessful : true, data : user};
            }else{
                return {isSuccessful : false, data : null};
            }
        } catch (e) {
            console.error(e);
            return {isSuccessful : false, data:null};
        }
    };

    async deleteUser ( user : User ) : Promise<{isSuccessful : boolean, message : string} | null>{
        if(user){
            await user.destroy();
            return { isSuccessful : true, message : "삭제되었습니다." };
        }else{
            return null;
        }
    }

    async updatePoint ( id : string, point : number) : Promise<User | null> {
        try {
            const user = await User.findByPk(id);
            await user?.update({point:user.point+point});    
            return user;
        } catch (e) {
            return null;
        }
    }
}