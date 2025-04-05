import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import User from '../../models/User.js';

let signUp = async (req, res, next) => {
    req.body.email = req.body.email.toLowerCase()
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    // console.log("Data en el back: ",req.body)
    try {
        await User.create(req.body)
        return res.status(201).json({
            success: true,
            message: "El usuario fue creado"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error creando el usuario"
        });
    }
}

export default signUp;