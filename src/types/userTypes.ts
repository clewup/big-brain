export interface UserType {
    id: string;
    email: string;
}

export interface UserLoginType {
    email: string;
    password: string;
}

export type LoginFormValues = UserLoginType;