import { useRef, useState, useEffect, useContext, React } from "react";
// import AuthContext from "./Context/AuthPrvoider";
// import axios from "./API/axios";
import './Login.css';
import logo1 from "../../Images/app_icon.png";
import logo2 from "../../Images/login_img.png";
// const LOGIN_URL = "/auth";
import { useNavigate } from "react-router-dom";

function togglePassword () {
    var x = document.getElementById('password');
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

function Login() {
    let navigate = useNavigate();
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // try {
        //     const response = await axios.post(LOGIN_URL, 
        //         JSON.stringify({user, pwd}),
        //         {
        //             headers: {'Content-Type': 'application/json'},
        //             withCredentials: true
        //         }
        //     );
        //     console.log(JSON.stringify(response?.data));

        //     //console.log(user, pwd); // see user login detail
        //     const accessToken = response?.data?.accessToken;
        //     const roles = response?.data?.roles;
        //     setAuth({ user, pwd, roles, accessToken });
        setUser('');
        setPwd('');
        setSuccess(true);

        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 400) {
        //         setErrMsg('Missing Username or Password');
        //     } else if (err.response?.status === 401) {
        //         setErrMsg('Unauthorized');
        //     } else {
        //         setErrMsg('Login Failed');
        //     }
        //     errRef.current.focus();
        // }
    }

    return (
        <div className="login-container">
            <section id="left-box">
                <img src={logo1} alt="Application Logo" id="app-logo"/>
                <img src={logo2} alt="Example Img"id="example-img"/>
                <h2 id="login-display-text">Monitor your business with our software.</h2>
                <h2 id="login-display-text">Powered by Apache Kafka.</h2>
            </section>

            <section id="right-box">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 id="login-title">Log in to WareEyes</h1>
                <form onSubmit={handleSubmit}>
                    <label id='user-pwd' htmlFor="username">Username</label>
                    <input 
                        autocomplete="off"
                        type="text" 
                        id="username"
                        placeholder="Enter username..."
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <label id='user-pwd' htmlFor="password">Password</label>
                    <input
                        autocomplete="off"
                        type="password"
                        id="password"
                        placeholder="Enter password..."
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <span className = "eye-main" onClick = {togglePassword}>
                        <i id="eye-open" className="fa fa-eye"></i>
                        <i id="eye-close" className="fa fa-eye-slash" ></i>
                    </span>
                    <p>
                        <a id="forgetpassword" href="ForgetPassword">Forgot password?</a>
                    </p>
                    <button id = "login-btn" onClick = {() => {navigate("/DashBoard")}}> Log in</button>
                </form>
            </section>
        </div>
    )
}

export default Login