import { RolesEnum } from '@/enums';

export interface AccessTokenType {
    id: string;
    email: string;
    customer: number;
    role: RolesEnum;
    variants: string[];
    exp: number;
}