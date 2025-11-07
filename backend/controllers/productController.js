
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
// fuction to add pdt
const addPdt = async(req, res)=>{

    //we use a middleware using multer, if we send any file as form data=> parsed using multer
    try{
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=>item!==undefined)

        //now we have to store these data and images in the database, but in db we cannot store image, hence we upload on cloudinary, get url and store the url in database

        //Storing images directly increases document size, making: queries slower, backups heavier

        //uploading it on the cloud

        //we want to upload multiple images asynchronously. Each upload returns a promise. Promise.all() lets run all uploads in parallel and waits until all afre executed.It returns an array of required resolved values in the end
        let imagesUrl = await Promise.all(

            images.map(async(item)=>{
                //images are to be saved and uploaded in cloudinary storage
                let result = await cloudinary.uploader.upload(item.path,{resource_type : 'image'})
                //after this, we will get a secure url
                return result.secure_url
            })

        )

        // console.log(name, description, price, category, subCateory, sizes, bestSeller)
        // console.log(images);
        // console.log(imagesUrl)

        //finally we need to save data in mongodb
        const productData = {
            name,
            description,
            price : Number(price),
            image : imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes), //converting from string to array,
            bestSeller : bestSeller === "true" ? true : false,
            date: Date.now()

        }
        
        console.log(productData)
        const product = new productModel(productData)
        await product.save()

        res.json({success : true, message : "Product Added"})
    }catch(error){
        res.json({success: false, message: error.message})
    }

    
}

// fuction to list pdt
const listPdt = async(req, res)=>{

    try{
        const products = await productModel.find({});
        res.json({success:true, products})

    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
    
}

// fuction to remove pdt
const removePdt = async(req, res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product removed from database"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

// fuction to single pdt
const singlePdt = async(req, res)=>{

     try{
        const {productId} = req.body;
        const product = await productModel.findById(productId)
        res.json({success:true, message:product})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addPdt, listPdt, removePdt, singlePdt}