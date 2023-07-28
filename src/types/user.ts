export type LoginInfo = {
    nickname : string,
    password : string
};

export type UserInfo = LoginInfo & {
    isAdmin : boolean,
    name : string,
    mobile : string,
};

export type UpdateInfo = {
    password ? : string,
    nickname ? : string,
    mobile ? : string
};

