import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo1 from '../../Images/app_icon.png';
import './ForgetPassword.css';

function ForgetPassword () {
    let navigate = useNavigate();

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
                            placeholder='Enter your email...'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button id='reset-password' onClick = {() => {navigate("/ResetPassword")}}>Reset Your Password</button>
                        <button id='return-to-login' onClick = {() => {navigate("/Login")}}> Go back</button>
                    </form>
                </main>
            </div>
        </div>
    )
}


export default ForgetPassword;
