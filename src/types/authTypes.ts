import { RolesEnum } from '@/enums';

export interface AccessTokenType {
    id: number;
    email: string;
    customer: number;
    role: RolesEnum;
    variants: string[];
    exp: number;
}
