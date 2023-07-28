import { container, singleton } from "tsyringe";
import UserRepository from "../repository/user.repository";
import bcrypt from 'bcrypt';
import { config } from "../../config";
import auth from "../../middleware/auth";
import {LoginInfo, UserInfo, UpdateInfo} from "../../types/user";
import { ResponseData } from "../../types/response";
import User from "../../database/model/user.model";

const userRepository = container.resolve(UserRepository);

@singleton()
export default class UserService{
    private userRepository = userRepository;

    public async login ( data : LoginInfo){
        const { nickname , password } = data;
        const user = await this.userRepository.findByNickname(nickname);
        const comparePassword = user?.password;

        if(comparePassword){
            const result = bcrypt.compareSync(password,comparePassword);
            if(result){
                const token = auth.getToken(user.id, user.isAdmin);
                return token;
            }else{
                return null;
            }
        }
    }

    public createUser (data : UserInfo){
        const { isAdmin, name, nickname, mobile } = data;
        const password = bcrypt.hashSync(data.password, Number(config.bcrypt.salt));

        return this.userRepository.createUser( isAdmin, name, nickname, mobile, password );
    }

    public async updateUser (userId : string, data : UpdateInfo) : Promise<ResponseData<User> | undefined>{
        Object.keys(data).forEach( key => {
            if(data[key] === undefined) delete data[key]
        });

        if(Object.keys(data).length==0) return undefined; // 업데이트 정보가 하나도 없을시
        
        const user = await this.userRepository.findById(userId);

        if(user.data){
            const permit = bcrypt.compareSync(data.confirmPassword,user.data.password) // 업데이트 요청에 대한 비밀번호 확인
            
            if(permit){
                return this.userRepository.updateUser( user.data , data );
            }else{
                return undefined;
            }
        }
    }

    public async deleteUser ( userId : string , data : { confirmPassword : string } ) {
        const user = await this.userRepository.findById(userId);

        if(user.data){
            const permit = bcrypt.compareSync(data.confirmPassword,user.data.password) // 업데이트 요청에 대한 비밀번호 확인
            
            if(permit){
                return this.userRepository.deleteUser(user.data);       
            }else{
                return undefined;
            }
        }
    }

    public findById ( userId : string ){
        return this.userRepository.findById(userId);
    }
}