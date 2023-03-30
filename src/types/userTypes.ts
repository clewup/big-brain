import { RolesEnum } from '@/enums';

export interface UserType {
    id: number;
    email: string;
    role: RolesEnum;
}
