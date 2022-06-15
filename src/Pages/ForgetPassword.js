import {React, useState } from 'react'
import { Link } from 'react-router-dom'
import logo1 from '../images/app_icon.png';
import '../forgetPassword.css';

function ForgetPassword () {
    const [email, setEmail] = useState('');

    const onChange = e => {

    }

    const onSubmit = e => {
        e.preventDefault();
    }
    
    return (
        <div id = "forget-password-page"> 
            <div id = "forget-password-box">
                <img src={logo1} alt="Application Logo" id="app-logo1"/>
                   <p id="reset-password-title"> Reset Password </p>
                   <main>
                   <p id='email-address'> Email Address </p>
                    <form onSubmit={onSubmit}>
                        <input 
                            type='email' 
                            className='emailInput' 
                            placeholder='Enter your email'
                            id='email'
                            value={email}
                            onChange={onChange}
                        />
                        <button id='reset-password'><a href="Login">Reset Your Password</a></button>
                        <button id='return-to-login'><a href="Login">Go back</a></button>
                    </form>
                   </main>
                </div>
            </div>
    )
}


export default ForgetPassword;
