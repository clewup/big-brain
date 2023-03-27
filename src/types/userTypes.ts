import { RolesEnum } from '@/enums';

export interface UserType {
    id: string;
    email: string;
    role: RolesEnum;
}
