import { TokenType } from '@/types/authTypes'
import jwt from 'jsonwebtoken'

export function extractAccessToken(authorizationHeader: string | null) {
    if (!authorizationHeader) {
        return null // no header provided
    }

    const parts = authorizationHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null // invalid header format
    }

    return parts[1] // return the access token
}

export function decodeAccessToken(accessToken: string | null) {
    if (!accessToken) {
        return null // no token provided
    }

    const decodedToken = jwt.decode(accessToken)
    if (!decodedToken || typeof decodedToken === 'string') {
        return null // token cannot be decoded
    }

    return decodedToken as TokenType
}
