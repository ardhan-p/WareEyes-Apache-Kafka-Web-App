import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo1 from '../../Images/app_icon.png';
import './ResetPassword.css';

function togglePassword () {
    var x = document.getElementById('new-password');
    var y = document.getElementById('eye-open');
    var z = document.getElementById('eye-close');

    if(x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}

function toggleConfirmPassword () {
    var x = document.getElementById('confirm-password');
    var y = document.getElementById('eye-open1');
    var z = document.getElementById('eye-close1');

    if(x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}

function ResetPassword() {
    let navigate = useNavigate();

    const [pwd, setPwd] = useState('');
    const [confimpwd, setConfirmPassword] = useState('');

    // const onChange = e => {

    // }

    const onSubmit = e => {
        e.preventDefault();
    }

  return (
        <div id = "reset-password-page"> 
            <div id = "reset-password-container">
                <img src={logo1} alt="Application Logo" id="app-logo1"/>
                <label id="create-new-password-title"> Create New Password </label>
                <main>
                    <label id='password-text'> Password </label>
                    <form onSubmit={onSubmit}>
                        <input 
                            type='password' 
                            className='passwordInput' 
                            placeholder='Enter new password...'
                            id='new-password'
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                        <span className = "eye" onClick = {togglePassword}>
                            <i id="eye-open" className="fa fa-eye"></i>
                            <i id="eye-close" className="fa fa-eye-slash" ></i>
                        </span>
                    <label id='confirm-password-text'> Confirm Password </label>
                        <input 
                            type='password' 
                            className='passwordInput' 
                            placeholder='Enter confirm password...'
                            id='confirm-password'
                            value={confimpwd}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        /> 
                        <span className = "eye1" onClick = {toggleConfirmPassword}>
                            <i id="eye-open1" className="fa fa-eye"></i>
                            <i id="eye-close1" className="fa fa-eye-slash" ></i>
                        </span>
                        <button id='confirm-btn'>Confirm</button>
                        <button id='return-to-login' onClick = {() => {navigate("/Login")}}> Go back</button>
                    </form>
                </main>
            </div>
        </div>
  )
}

export default ResetPassword