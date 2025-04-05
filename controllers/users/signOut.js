import User from '../../models/User.js'
const signOut = async (req, res,next)=>{
    const {email} = req.user
    try {
        await User.findOneAndUpdate({email},{token:""})
        return res.status(200).json({
            success: true,
            message: 'User signed out'
        })
    } catch (error) {
        next(error)
    }
}

export default signOut