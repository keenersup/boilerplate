import * as jwt from 'jsonwebtoken'
import {Request, Response} from 'express'
import {SECRET_KEY} from '../config'
import { UserToken } from '../types'

export const addUser = (req: Request, res: Response): UserToken | undefined => {
    const header = req.headers.authorization
    if (header) {
        const accessToken = header.split('Bearer ')[1]
        if (accessToken) {
            try {
                return jwt.verify(accessToken, SECRET_KEY) as UserToken
            } catch (errors) {
                return
            }
        } else {
            res.redirect('/')
        }
    }
    return
}