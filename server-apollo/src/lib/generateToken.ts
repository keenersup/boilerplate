import * as jwt from 'jsonwebtoken'
import {ACCESSTOKEN_EXPIRED, REFRESH_SECRET_KEY, REFRESHTOKEN_EXPIRED, SECRET_KEY} from '../config';
import { UserToken } from '../types';

// type AccessToken = string
// type RefreshToken = string
const generateRefreshSecret = (clientId: string): string => {
    return clientId + REFRESH_SECRET_KEY
}

export function generateToken<AccessToken extends string, RefreshToken extends string>(user: UserToken, secret: string, clientId: string)
    : [AccessToken, RefreshToken] {
    const refreshSecret = generateRefreshSecret(clientId)
    const generateAccessToken = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        clientId,
    }, secret, {expiresIn: ACCESSTOKEN_EXPIRED}) as AccessToken

    const generateRefreshToken = jwt.sign({
        id: user.id,
        clientId,
    }, refreshSecret, {expiresIn: REFRESHTOKEN_EXPIRED}) as RefreshToken

    return [generateAccessToken, generateRefreshToken]
}

export function refreshToken<AccessToken extends string, RefreshToken extends string>(accessToken: string, user: UserToken, clientId: string): [AccessToken, RefreshToken] {
    const refreshSecret = generateRefreshSecret(clientId)
    try {
        const verifiedToken: { [path: string]: any } = jwt.verify(user.refreshToken!, refreshSecret) as UserToken
        if (typeof verifiedToken === 'object' && verifiedToken.clientId !== clientId) {
            throw {clientId: 'not valid token'}
        }
        return generateToken(user, SECRET_KEY, clientId);
    } catch (err) {
        console.log(err);
        throw {refreshToken: 'refresh Token error'}
    }
}










