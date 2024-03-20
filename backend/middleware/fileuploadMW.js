const express = require('express');
const multer = require('multer');
const path = require('path');

const productImageStorageSetting = multer.diskStorage({
    destination: function(req, file, callback){
        //ur own code here
        const destinationFolder = path.join(__dirname, '../uploads/');
        //current working directory + '../uploads/'
        callback(null, destinationFolder)
    },
    filename: function(req,file,callback)
    {
        let timestamp= Date.now(); //will give u a random number(timestamp dete hai current time ka)
        const extname = path.extname(file.originalname) //file.originalname mein img ka name jo user ne 
        // likha hai woh milta hai. path.extname humko uska sirf extension lake dega without img name.
        let fileNewName = `${timestamp}${extname}` //agr dono variable ke bich mein space aya toh
        // file upload nhi hogi proper error ayega.
        req.fileNewName = fileNewName; //ye req object mein ek key-value pair add krega. jisme file name milega
        callback(null , fileNewName )
    }
})
//destination, filename kaam ho gya
// now u have to check file extension, file size
const upload = multer({
    storage: productImageStorageSetting,
    fileFilter: function(req, file , callback)
    {
        // file.mimetype -> 'image/jpeg, image/png , image/jpg , image/webp'
        const allowedMimeTypes = ['image/jpeg', 'image/png' , 'image/jpg' , 'image/webp'];
        const mimetype = file.mimetype;
        callback(null , true)
        // if(allowedMimeTypes.includes(mimetype))
        // {//mimetype is checked and okay
        //     const allowedSizes = 1024 * 1024 * 5 //5mb tu into karke direct value bhi pass kar sakta hai.
        //     if(file.size < allowedSizes){
        //         callback(null , true) //true yeh file accept karega false nhi accept karega.
        //     }
        //     else{
        //         callback(new Error('file size cannot be more than 5 mb') , false)
        //     }
        // }
        // else{
        //     callback(new Error('invalid mimetype/ file extension') , false)
        // }
    }
})

module.exports = upload;