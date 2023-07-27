import { container, singleton } from "tsyringe";
import UserRepository from "../repository/user.repository";
import bcrypt from 'bcrypt';
import { config } from "../../config";

const userRepository = container.resolve(UserRepository);

type LoginInfo = {
    nickname : string,
    password : string
}

type UserInfo = LoginInfo & {
    isAdmin : boolean,
    name : string,
    mobile : string,
};

@singleton()
export default class UserService{
    private userRepository = userRepository;

    public createUser (data : UserInfo){
        const { isAdmin, name, nickname, mobile } = data;
        const password = bcrypt.hashSync(data.password, Number(config.bcrypt.salt));

        return this.userRepository.createUser( isAdmin, name, nickname, mobile, password );
    }

    public login ( data : LoginInfo){
        const { nickname , password } = data;
        this.userRepository.findByNickname(nickname).then(user=>{
            if(user){
                
            }else{

            }
        });
    }

    public findById ( userId : string ){
        return this.userRepository.findById(userId);
    }
}