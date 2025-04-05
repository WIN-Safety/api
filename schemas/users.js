import joi from 'joi';

export const userSignUp = joi.object({
    name: joi.string().min(4).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(25).required(),
    phone: joi.string().pattern(/^[0-9]{8,15}$/).required(),
})