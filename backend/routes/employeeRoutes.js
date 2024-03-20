const express = require('express');
const employeeSchema = require('../schemas/employeeSchema');
const router = express.Router();
const upload = require('../middleware/fileuploadMW.js');



router.post('/' ,upload.single('employeePic') ,async (req,res)=>{
    let { empName , empSalary, empDesignation, empPhone, empEmail } = req.body;
try {
  const createEmployee = await  employeeSchema.create({
    name : empName,
    salary: empSalary,
    designation: empDesignation,
    phone: empPhone,
    email: empEmail,
    employeePic: req.fileNewName,
    employeePicOGName: req.file.originalname
  })
  res.json({
    status: 1,
    message: 'employee created successfully',
    data: createEmployee,
  })
} 
catch (error) {
  console.log(error);
  res.json({
    status: 0,
    message: 'employee could not be created',
    data: null,
  })
}
})

router.get('/' , async function(req,res){
  try {
    let allEmployees = await employeeSchema.find({});
    res.json({
      status:1,
      message: 'Fetched Employees Successfully',
      data: allEmployees,
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Fetching Failed',
      data: null,
    })
  }
})

router.get('/:id' , async function(req,res){
  try {
  let singleEmployee = await employeeSchema.findById(req.params.id)
  res.json({
    status:1,
    message:' single employee fetched successfully',
    data: singleEmployee,
  })
  } 
  catch (error) {
    res.json({
      status:0,
      message:' single employee fetching failed',
      data: null
    })
  }
})

router.delete('/:id' , async function(req,res){
  try {
  let deletedEmployee = await employeeSchema.findByIdAndDelete(req.params.id);
  res.json({
    status:1,
    message:'employee deleted successfully',
    data: deletedEmployee
  })  
  } 
  catch (error) {
    res.json({
      status:0,
      message:'employee could not be deleted ',
      data: null
    })  
  }
})


router.put('/:id' , async function(req,res){
  try {
    let { empName , empSalary, empDesignation, empPhone, empEmail } = req.body;
    let updatedEmployee = await employeeSchema.findByIdAndUpdate(req.params.id , {
    name : empName,
    salary: empSalary,
    designation: empDesignation,
    phone: empPhone,
    email: empEmail,
    } , {new: true} , {insert:true})
    res.json({
      status:1,
      message: 'employee updated successfully',
      data: updatedEmployee
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'employee could not updated ',
      data: null
    })
  }
})
















module.exports = router;