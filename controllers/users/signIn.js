import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

let signIn = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // console.log(user)

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'                    
            })
        }


        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        await user.save();

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '360d' });
        // console.log(process.env.JWT_SECRET)

        return res.status(200).json({
            success: true,
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default signIn;