import { RolesEnum } from '@/enums';
import { NextApiRequest } from 'next';

export interface AccessTokenType {
    id: number;
    email: string;
    role: RolesEnum;
    exp: number;
}

export interface AuthorizedNextApiRequest extends NextApiRequest {
    accessToken?: AccessTokenType;
}
