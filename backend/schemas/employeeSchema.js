const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    salary:{
        type: Number,
        required : true
    },
    designation:{
        type: String,
        required : true
    },
    phone:{
        type: Number,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    employeePic:{
        type: String,
        required: true,
    },
    employeePicOGName:{
        type: String,
    }
})

module.exports = mongoose.model('employee' , employeeSchema);