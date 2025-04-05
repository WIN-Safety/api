import User from '../models/User.js'

async function accountExistsSignIn(req, res, next) {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (user) {
        req.user = {
            _id: user._id,
            email: user.email,
            password: user.password,
            phone: user.phone,
        }
        return next()
    }
    return res.status(400).json({
        success: false,
        message: [{
            path: 'credentials',
            message: 'Usuario no encontrado'
        }]
    })
}

export default accountExistsSignIn