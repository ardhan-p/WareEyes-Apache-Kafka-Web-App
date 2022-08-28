import React from 'react'
import { useNavigate } from "react-router-dom";

// error page will render if user goes to a non-routed webpage
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