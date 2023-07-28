import { container, singleton } from "tsyringe";
import UserRepository from "../repository/user.repository";
import bcrypt from 'bcrypt';
import { config } from "../../config";
import auth from "../../middleware/auth";
import {LoginInfo, UserInfo, UpdateInfo} from "../../types/user";

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

    public updateUser (userId : string, data : UpdateInfo){
        const { mobile, nickname, password } = data;
    }

    public findById ( userId : string ){
        return this.userRepository.findById(userId);
    }
}