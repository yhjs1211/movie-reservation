import { container, singleton } from "tsyringe";
import UserRepository from "../repository/user.repository";

const userRepository = container.resolve(UserRepository);

type UserInfo = {
    isAdmin : boolean,
    name : string,
    nickname : string,
    mobile : string
};

@singleton()
export default class UserService{
    private userRepository = userRepository;

    public createUser (data : UserInfo){
        const { isAdmin, name, nickname, mobile } = data;
        return this.userRepository.createUser( isAdmin, name, nickname, mobile );
    }
}