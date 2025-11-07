import multer from "multer";

//study multer 
//create storage configuration

const storage = multer.diskStorage({ //store files in the hard disk
    //define filename for the file
    filename:function(req, file, callback){
        //naming the file with its original name using callback
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

export default upload
