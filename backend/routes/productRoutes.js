import express from 'express'
import { listPdt, singlePdt, removePdt, addPdt } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const pdtRouter = express.Router()

//upload.fields() for multipart form data
pdtRouter.post('/add',adminAuth,upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]), addPdt)
pdtRouter.post('/remove',adminAuth, removePdt)
pdtRouter.get('/single', singlePdt)
pdtRouter.get('/list',listPdt )

export default pdtRouter