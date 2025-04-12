import express from 'express';
import signUp from '../controllers/users/signUp.js'
import signIn from '../controllers/users/signIn.js'
import signOut from '../controllers/users/signOut.js'
import { userSignUp } from '../schemas/users.js'
import accountExistsSignUp from '../middlewares/accountSignUp.js'
import accountExistsSignIn from '../middlewares/accountSignIn.js'
import passwordIsOk from '../middlewares/passwordIsOk.js';
import validator from '../middlewares/validator.js'

const router = express.Router()

// router.post('/signup', accountExistsSignUp, validator(userSignUp), signUp)
router.post('/signin', accountExistsSignIn, passwordIsOk, signIn)
router.post('/signout', signOut)

export default router