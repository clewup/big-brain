import { RolesEnum } from '@/enums';

export interface UserType {
    id: number;
    email: string;
    role: RolesEnum;
}

export interface PublicUserType {
    id: number;
    username: string;
}
