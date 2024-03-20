const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'fca19bc66b61d46afa52d0b5b0408352e95aa5ee42e78741c62753730ae700a2';




const authMiddleWare = function( req,res,next){ 
    //hum yahan se bhi response, request send kar sakte hai. 
    console.log('auth middleware called');
    const token = req.headers.authorization;// agr key(authorisation) present nhi hai toh undefined ayega.
    // agr kisi object ka key access karne jaa rhe hai aur woh present nhi hai toh undefined ayega.
    // jabtak hamare pass frontend nhi hai tabtak hum aise token lenge warna hum token ko localstorage mein
    //  store karenge aur waha se access krenge  
    if(token){
        //token is present
        jwt.verify(token , JWT_SECRET_KEY , function(error , decodedValue){
            // decoded value yeh humko secret key decode karke detahai..jo baad mein kaam ayega
            if(!error){
                //token is valid
                next();
            }
            else{
                res.json({
                    status:0,
                    message: 'pls login to continue'
                })
            }
        })
    }
    else{
        console.log('token not present')
        res.json({
            status:0,
            message: 'pls login to continue'
        })
    }
    
    
    
    
// next()
}

module.exports = authMiddleWare

// extra code in middleware
// // const isLoggedIn = false;
    // if(!isLoggedIn){
    //     return res.json({
    //         status: 0,
    //         message: 'pls Login to continue',
    //         data: null,
    //     })
    // }