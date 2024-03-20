import { useState,useEffect } from "react";
import React from "react";
import { useParams } from "react-router";
import { getSingleEmployee , editEmployee } from "../store/employeeSlice/employeeSlice";
import { UseDispatch, useDispatch,useSelector } from "react-redux";

function EditEmployee (){
  const dispatch = useDispatch();

  const params = useParams();

const employeeDocument = useSelector((state)=>{
  return state.employeeSlice.editEmp
})


const [formData , updateFormdata] = useState({
  //name: , email: yeh variable ke name change kar sakte hai kyonki yeh varaibles iss usestate ke hai,
    name: employeeDocument.name,
    email: employeeDocument.email,
    phone: employeeDocument.phone,
    salary: employeeDocument.salary,
    designation: employeeDocument.designation,
})


useEffect(function(){
  dispatch( getSingleEmployee(params.empID) )
} , [])
//yeh dono useeffect alag isliye use kare kyonki agr ek sath karte toh function update fir state update 
// fir se function update fir se state update aise karte karte ek infinite loop run hota.
useEffect(function(){
updateFormdata({
  ...employeeDocument // form mein jo data chahiye woh iss document se ayega iske liye isko update kar rhe hai taki state mein latest data mile
})
} , [employeeDocument])

const handleChange = (e)=>{
    // console.log(formData)
    updateFormdata({
        ...formData , 
        [e.target.name] : e.target.value
    })
}

const editEmployeeSubmit = (e)=>{
    e.preventDefault();

    const editedEmpData ={
      empID : params.empID, //isme id hai.
      // backend ko data isi name se chahiye empSalary empName etc. 
      empName : formData.name,
      empSalary :formData.salary,
      empDesignation : formData.designation,
      empEmail : formData.email,
      empPhone :formData.phone
    }
    dispatch(editEmployee(editedEmpData) )
    }

    return(<>
    
<div className="conatiner mt-5">
<div className="row d-flex justify-content-center mt-5">
    <div className="col-md-4">
        <h2>EditEmployee</h2>
        <form onSubmit={editEmployeeSubmit}>


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



  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
</div>
</div>
    
    </>)
}



export default React.memo(EditEmployee);