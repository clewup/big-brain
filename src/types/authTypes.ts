import { RolesEnum } from '@/enums';

export interface AccessTokenType {
    id: string;
    email: string;
    role: RolesEnum;
    exp: number;
    iss: string;
    aud: string;
}