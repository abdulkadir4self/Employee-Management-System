import React, { useEffect } from "react";
import { UseSelector , useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";


function ProtectedRoute(props){
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);

useEffect(function(){
  if(!isLoggedIn){
    navigate('/login');
    return;
  }
} , [])

const ComponentToDisplay = props.component
return(<>
     
     <ComponentToDisplay/>

    </>)

}
export default React.memo(ProtectedRoute);