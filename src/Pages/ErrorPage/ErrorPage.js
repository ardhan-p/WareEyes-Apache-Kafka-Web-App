import React from 'react'
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    let navigate = useNavigate();
    return (
        <div><center> ERROR! PAGE NOT FOUND!</center>
           <center> <button 
                onClick={() => {
                    navigate("/Login");
                }}
            > return </button></center>
        </div>
  )
}

export default ErrorPage