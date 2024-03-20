import { useState } from "react";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addEmployee } from "../store/employeeSlice/employeeSlice";
// import employeeSlice from "../store/employeeSlice/employeeSlice";
function AddEmployee (){
const dispatch = useDispatch();
// const selector = useSelector( state => state.employeeSlice.message);
const [image , saveImage] = useState(null);

const [formData , updateFormdata] = useState({
  name: '',
  email: '',
  phone: '',
  designation: '',
  salary: '',
})

const handleChange = (e)=>{
  // console.log(formData)
  // console.log(selector);
    updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
    })
}

const addEmployeeSubmit = (e)=>{
e.preventDefault();
const fd = new FormData(); // yeh ek class hai jo send karta hai normal form ko images ke sath.jabhi image 
// hogi toh yeh krana compulsory hai.
fd.append('empName' , formData.name);
fd.append('empPhone' , formData.phone);
fd.append('empEmail' , formData.email); 
fd.append('empSalary' , formData.salary);
fd.append('empDesignation' , formData.designation);
fd.append('employeePic' , image); 

dispatch( addEmployee(fd) );
// alert( 'employee Added Successfully' )
}


    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>AddEmployee</h2>
        <form onSubmit={addEmployeeSubmit}>


    <div className="form-group">
    <label>Name</label>
    <input value={formData.name} type="text" className="form-control"  placeholder="Enter Name" name="name" onChange={handleChange} />
  </div>



  <div className="form-group">
    <label>Email address</label>
    <input value={formData.email} type="email" className="form-control"  placeholder="Enter email"  name="email" onChange={handleChange} />
  </div>

 <div className="form-group">
    <label>Phone No</label>
    <input value={formData.phone} type="text" className="form-control"  placeholder="Enter Phone No." name="phone" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Designation</label>
    <input value={formData.designation} type="text" className="form-control"  placeholder="Enter Designation" name="designation" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Salary</label>
    <input value={formData.salary} type="text" className="form-control"  placeholder="Enter Salary" name="salary" onChange={handleChange} />
  </div>

  <div className="form-group">
    <label>Image</label>
    <input type="file" className="form-control" name="image" onChange={(e)=>{
      console.log(e.target.files);
      saveImage(e.target.files[0]);//yeh iamges sab array mien milegi chahe ek ho ya many. jab sirf ek image
      //  chahiye toh [0] likhne ka.
    }}    />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
</div>
</div>
    
    </>)
}



export default React.memo(AddEmployee);