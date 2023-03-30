import { RolesEnum } from '@/enums';
import { NextApiRequest } from 'next';

export interface AccessTokenType {
    id: number;
    email: string;
    customer: number;
    role: RolesEnum;
    variants: string[];
    exp: number;
}

export interface AuthorizedNextApiRequest extends NextApiRequest {
    accessToken?: AccessTokenType;
}
