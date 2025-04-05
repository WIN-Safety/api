import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const verifyCurrentPassword = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id).exec()
        let { oldPassword } = req.body
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            })
        }

        const isMatch = bcrypt.compareSync(oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña ingresada es incorrecta'
            })
        }
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'Un error ha ocurrido verificando la contraseña'
        })
    }
}

export default verifyCurrentPassword