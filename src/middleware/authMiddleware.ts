import { AccessTokenType, AuthorizedNextApiRequest } from '@/types';
import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';

const authenticateToken = (req: AuthorizedNextApiRequest): boolean => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const accessToken = authHeader.split(' ')[1]
        try {
            const secret = process.env.JWT_SECRET
            if (!secret) {
                throw new Error("JWT Secret has not been provided.");
            }
            req.accessToken = jwt.verify(accessToken, secret) as AccessTokenType;
            return true;
        } catch (error) {
            return false
        }
    }
    return false
}

const authMiddleware = (handler: (req: AuthorizedNextApiRequest, res: NextApiResponse) => Promise<void | NextApiResponse>) => {
    return async (req: AuthorizedNextApiRequest, res: NextApiResponse) => {
        if (!authenticateToken(req)) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }
        await handler(req, res)
    }
}

export default authMiddleware;