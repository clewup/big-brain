import { RolesEnum } from '@/enums';

export interface UserType {
    id: string;
    email: string;
    role: RolesEnum;
}

export interface UserLoginType {
    email: string;
    password: string;
}

export type LoginFormValues = UserLoginType;