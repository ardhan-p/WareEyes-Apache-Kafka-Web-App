import { useRef, useState, useEffect, useContext } from "react"
// import AuthContext from "./context/AuthPrvoider";
// import axios from "./api/axios";
import logo1 from "./images/app_icon.png";
import logo2 from "./images/login_img.png";
// const LOGIN_URL = "/auth";

const Login = () => {
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
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br/>

                    <p>
                        <a href="Login">Go to Home</a>
                    </p>
                </section>
            ) : (
                <div id="login-box">
                    <section id="left-box">
                        <img src={logo1} alt="Application Logo" id="app-logo"/>
                        <img src={logo2} alt="Example Image"id="example-img"/>
                        <h2>Monitor your business with our software.</h2>
                        <h2>Powered by Apache Kafka.</h2>
                    </section>

                    <section id="right-box">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 id="login-title">Log in to WareEyes</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input type="text" 
                                id="username"
                                placeholder="Enter username..."
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password..."
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <p>
                                {/*put router link here*/}
                                <a href="#">Forgot password?</a>
                            </p>
                            <button>Login</button>
                        </form>
                    </section>
                </div>
                )}
        </>
    )
}

export default Login