import User from '../models/User.js'

async function accountExistsSignUp(req, res, next) {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: [
                {
                    path: "userExist",
                    message: "Ya existe un usuario registrado con ese correo"
                }
            ]
        });
    }
    next();
}
export default accountExistsSignUp;