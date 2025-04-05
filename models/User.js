import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: {type: String, required: true, min: 4, max: 30},
    email: {type: String, required: true, unique:true},
    password: {type: String, required:true},
    phone: {type: String, required: true, match: /^[0-9]{9,15}$/},
    role: {type:Number, required: true, default: 0}
}, {timestamps: true})

const User = model('User', userSchema) 
export default User