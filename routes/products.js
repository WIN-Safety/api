import express from 'express'
import passport from '../middlewares/passport.js'
import createProduct from '../controllers/products/createProduct.js'
import updateProduct from '../controllers/products/updateProducts.js'
import deleteProduct from '../controllers/products/deleteProduct.js'
import read from '../controllers/products/read.js'
import readOne from '../controllers/products/readOne.js'
import { upload } from '../utils/fileUpload.js'
import getCategories from '../controllers/products/readCategories.js'
import getProductsByCategory from '../controllers/products/readProductsByCategory.js'

const router = express.Router()

router.get('/categories', getCategories)
router.get('/categories/:categoria', getProductsByCategory);
router.get('/', read)
router.get('/:id', readOne)
router.post('/create', passport.authenticate('jwt', { session: false }), upload.array('images', 10), createProduct)
router.put('/:id', passport.authenticate('jwt', { session: false }), upload.array('images', 10), updateProduct)
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteProduct)

export default router