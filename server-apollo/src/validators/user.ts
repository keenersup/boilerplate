import Joi from '@hapi/joi'

const email = Joi.string().email().min(8).max(254).trim().required()
const username = Joi.string().min(3).max(128).trim().required()
const password = Joi.string().pattern(/^[a-zA-Z0-9]{4,30}$/).required().messages({
    'string.base':"몬가 잘못됬다",
    'string.empty':'비었다',
    'string.pattern.base':`"password" 올바른 암호를 입력하세요 `,
})
const confirmPassword = Joi.valid(Joi.ref('password')).required().messages({
    'any.only':"같아야한다 ",
})

export const register = Joi.object({
    email,
    username,
    password,
    confirmPassword,
})
export const login = Joi.object({
    email,
    password,
})