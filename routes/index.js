import express from 'express'
import usersRouter from './users.js'
import productsRouter from './products.js'


const router = express.Router()

router.use('/users', usersRouter)
router.use('/products', productsRouter)

router.get('/connect', async(req, res) => {
    res.json({
        success: true,
        message: 'database connected'
    })
})

export default router