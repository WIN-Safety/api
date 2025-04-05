import 'dotenv/config.js'
import './config/database.js'
import cors from 'cors'
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'
import indexRouter from './routes/index.js'
import {__dirname} from './utils/util.js'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err: {}
    
    res.status(err.status || 500)
    res.render('error')
})

export default app