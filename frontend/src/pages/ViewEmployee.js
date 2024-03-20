import React,{useEffect} from 'react'
import {useDispatch , useSelector} from "react-redux";
import { viewEmployee, deleteEmployee } from '../store/employeeSlice/employeeSlice';
import {useNavigate} from 'react-router';
function ViewEmployee(){
    const navigate = useNavigate();
    const employeeSlice = useSelector((state)=>{
        return state.employeeSlice
    })
    const dispatch = useDispatch();

    useEffect(function(){
        dispatch( viewEmployee() )
    }, [])
    return(<>
        <div className='mt-5 p-4'>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Salary</th>
                        <th>Designation</th>
                        <th>Pic</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                { employeeSlice.employee.map(function(emp,index){
                    return (
                        <tr key={index}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.designation}</td>
                            <td>
                                <img src={`http://localhost:5004/employeePic/${emp.employeePic}`} />
 {/* employeePic yeh backend mein likha hai. iske bina nhi hoga */}
                            </td>
                            <td>
                                <button onClick={
                                    (e)=>{
                                        navigate(`/edit/${emp._id}`)
                                    }
                                }
                                 className='btn btn-warning mr-2'>
                                    Edit
                                </button>

                                <button onClick={(e)=>{
                                    dispatch(deleteEmployee(emp._id)) 
                                }}
                                 className='btn btn-danger'>
                                Delete
                                </button>
                            </td>


                        </tr>
                    )
                }) }

                </tbody>
            </table>
        </div>
    
    </>)
}

export default React.memo(ViewEmployee)