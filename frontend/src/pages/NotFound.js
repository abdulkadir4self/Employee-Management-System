import React from "react";
import { useNavigate } from "react-router";


function NotFound(){
    const navigate = useNavigate();
    return(<>
    
    <h2 className="mt-5 text-center">
        Page Not Found
    </h2>

    <button className="btn btn-dark" onClick={(e)=>{
        navigate('/')
    }}>Go To Home Page</button>
    
    </>)
}

export default React.memo(NotFound);