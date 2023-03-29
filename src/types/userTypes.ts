import { RolesEnum } from '@/enums';

export interface UserType {
    id: number;
    email: string;
    customer: number;
    role: RolesEnum;
}
