export interface IUser {
    id?: number;
    name: string;
    email: string;
}

export interface ILogin { 
    email: string;
    password: string;
}

export interface ISignup { 
    username: string;
    email: string;
    password: string;
}