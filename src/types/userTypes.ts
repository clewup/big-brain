import { RolesEnum } from '@/enums';

export interface UserType {
    id: string;
    email: string;
    customer: number;
    role: RolesEnum;
}
