import React from "react";
import { NavLink } from "react-router-dom";
import { UseSelector,useDispatch,useSelector } from "react-redux";
import { logout } from "../store/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar(){
  // const isLoggedIn = useSelector((state)=>{
  //   return state.authSlice.isLoggedIn
  // })
  const isLoggedIn = useSelector (state => state.authSlice.isLoggedIn)
  //agr arrow func. mein sirf ek argument (matlb(state)) chahiye toh usko bina ()bracket ke bhi likh sakte
  //  hai. aur sirf ek chiz return kar rha hai toh {} and return nhi bhi likhenge toh chalega
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // agr isLoggedIn ? MenuAfterLogin : MenuBeforeLogin
    return(<>
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">StaffSync</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
   {
    isLoggedIn ? (<>
    
      <li className="nav-item">
        <NavLink to='/' className="nav-link" href="#">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/view' className="nav-link" href="#">view</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/add' className="nav-link" href="#">Add Employee</NavLink>
      </li>
      <button className="btn btn-danger" onClick={function(){
        dispatch(logout())
        navigate('/login')
      }}>Logout</button>
    </>) 
    : (<>

      <li className="nav-item">
        <NavLink to='/register' className="nav-link" href="#">Register</NavLink>
      </li><li className="nav-item">
        <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
      </li>
    </>)
   } 

    </ul>
  </div>
</nav>
    
    </>)
}

export default React.memo(Navbar)

   {/* <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li> */}