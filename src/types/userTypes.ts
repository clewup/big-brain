import { RolesEnum } from '@/data/rolesEnum';

export interface UserType {
    id: number;
    email: string;
    role: RolesEnum;
}

export interface PublicUserType {
    id: number;
    username: string;
}
