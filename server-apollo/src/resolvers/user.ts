import formatError from "../lib/formatError";
import {IResolvers, UserInputError} from 'apollo-server-express'
import {login, objectId, register} from "../validators";
import {generateToken, refreshToken} from "../lib/generateToken";
import * as jwt from "jsonwebtoken";
import {SECRET_KEY} from "../config";
import {UserDocument} from "../models/user";
import {UserToken} from "../types";

import {Roles} from "../types/enum";
/*
todo: edit account && managing admin
      refreshToken set at redis
*/
const resolvers: IResolvers = {
    Query: {
        me: async (_, args, {models, user}): Promise<UserDocument | null> => {
            try {
                await objectId.validateAsync({id: user.id}, {abortEarly: false})
                return models.User.findById(user.id)
            } catch (e) {
                console.error(e)
                const errors = formatError(e)
                throw new UserInputError('me query', {errors})
            }
        },
        user: async (_, {id}, {models}): Promise<UserDocument | null> => {
            try {
                await objectId.validateAsync({id}, {abortEarly: false})
                return models.User.findById(id);
            } catch (e) {
                console.error(e);
                const errors = formatError(e)
                throw new UserInputError('user query', {errors})
            }
        },
        users: (_, args, {models}): UserDocument[] => {
            return models.User.find({})
        },
    },
    Mutation: {
        register: async (_, {
            username, email, password, confirmPassword, clientId
        }, {models}): Promise<UserDocument> => {
            try {
                await register.validateAsync({username, email, password, confirmPassword}, {abortEarly: false})

                const newUser = await new models.User({
                    username, email, password
                },)
                const [accessToken, refreshToken] = generateToken(newUser, SECRET_KEY, clientId);
                newUser.refreshToken = refreshToken;
                const user = await newUser.save()
                return {
                    ...user._doc,
                    id: user._id,
                    accessToken,
                }
            } catch (e) {
                console.error(e);
                const errors = formatError(e)
                throw new UserInputError('register mutation', {errors})
            }
        },
        login: async (_, {email, password, clientId}, {models}): Promise<UserDocument | null> => {
            try {
                await login.validateAsync({email, password}, {abortEarly: false})
                const user = await models.User.findOne({email})
                if (user) {
                    if (await user.matchesPassword(password)) {
                        const [accessToken, refreshToken] = generateToken(user, SECRET_KEY, clientId)
                        await user.updateOne({$set: {refreshToken}}, {new: true})
                        return {
                            ...user._doc,
                            id: user._id,
                            accessToken,
                        }
                    } else {
                        throw {password: 'wrong password'}
                    }
                } else {
                    throw {email: 'user not found'}
                }
            } catch (e) {
                console.error(e)
                const errors = formatError(e)
                throw new UserInputError('login mutation', {errors})
            }
        },
        logout: async (_, args, {models, user}): Promise<boolean> => {
            try {
                if (user) {
                    return !!await models.User.findByIdAndUpdate(user.id, {$unset: {refreshToken: 1}})
                } else {
                    throw {email: "ghost"}
                }
            } catch (e) {
                console.error(e)
                const errors = formatError(e)
                throw new UserInputError('logout mutation', {errors})
            }
        },
        deleteAccount: async (_, {email, password}, {models, user}): Promise<boolean> => {
            try {
                if (user.email === email) {
                    const findUser = await models.User.findById(user.id)
                    if (await findUser.matchesPassword(password)) {
                        return !!await findUser.deleteOne()
                    } else {
                        throw {password: 'wrong password'}
                    }
                } else {
                    throw {password: 'wrong email'}
                }
            } catch (e) {
                console.error(e)
                const errors = formatError(e)
                throw new UserInputError('delete account mutation', {errors})
            }
        },
        refreshToken: async (_, {accessToken, clientId}, {models}): Promise<{ accessToken: string }> => {
            try {
                const decodeToken = jwt.decode(accessToken) as UserToken
                if (!decodeToken) {
                    throw {accessToken: "not valid token"}
                }
                await objectId.validateAsync({id: decodeToken.id}, {abortEarly: false})
                const user = await models.User.findById(decodeToken.id)
                if (user) {
                    const [newAccessToken, newRefreshToken] = refreshToken(accessToken, user, clientId)
                    await user.updateOne({$set: {refreshToken: newRefreshToken}})
                    return {
                        accessToken: newAccessToken,
                    }
                } else {
                    throw {email: 'user not found'}
                }
            } catch (e) {
                console.error(e)
                const errors = formatError(e)
                throw new UserInputError('refreshToken mutation', {errors})
            }
        },
        deleteSelectedUser: async (_, {id}, {models, user}): Promise<boolean> => {
            try {
                await objectId.validateAsync({id}, {abortEarly: false})
                if (user.roles === Roles.admin) {
                    return !!await models.User.findByIdAndDelete(id)
                } else {
                    throw {email: 'not permission'}
                }
            } catch (e) {
                console.error(e)
                const errors = formatError(e)
                throw new UserInputError('deleteSelectedUser mutation', {errors})
            }
        },
        empowerAdmin: async (_, {id, roles}, {models}) => {
            try {
                await objectId.validateAsync({id}, {abortEarly: false})
                return !!await models.User.findByIdAndUpdate(id, {
                    $set: {
                        roles: roles,
                    },
                })
            } catch (e) {
                console.error(e)
                const errors = formatError(e)
                throw new UserInputError('empowerAdmin mutation', {errors})

            }
        },
    },
}

export default resolvers