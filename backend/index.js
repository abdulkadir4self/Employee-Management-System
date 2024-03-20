const express = require('express');
const app = express();
const port_No = 5004;
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleWare = require('./middleware/authMW.js');


mongoose.connect('mongodb://localhost:27017/employeeMngSystem')
.then(function(){
    console.log('EMS db connected sucessfully');
})
.catch(function(){
    console.log('EMS db is not connected');
})
app.use( cors() );
app.use('/employeePic' , express.static('uploads'))// employeePic ka name jo chahe rakh sakte hai but frontse 
// access karte waqt url mein yeh name hona chahiye.express.static botata hai ki static file hai aur ('uploads')yeh uss folder
// ka address jisme pic store hai.
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// product routes starts here
const employeeRoutes = require('./routes/employeeRoutes.js');
app.use('/api/v1/employee' , authMiddleWare ,employeeRoutes);


//auth routes start here
const authRoutes = require('./routes/authRoutes.js');
app.use('/api/v1/auth',authRoutes );

app.listen(port_No , function(){
    console.log(`The server is running on ${port_No}`);
})