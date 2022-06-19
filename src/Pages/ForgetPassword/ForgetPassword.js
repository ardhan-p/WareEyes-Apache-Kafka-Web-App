import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo1 from '../../Images/app_icon.png';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import './ForgetPassword.css';

function ForgetPassword() {
    const {
        values,
        handleSubmit,
        getFieldProps,
        touched,
        errors,
        handleBlur,
        handleChange,
        isSubmitting
    } = useFormik({
        initialValues: {
            email: "",
        },

        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email()
                .required("Email is required")
        }),

        onSubmit(values, { resetForm, setSubmitting }) {
            console.log("Submitting")
            console.log(values)
            setTimeout(() => {
                resetForm()
                setSubmitting(false)
            }, 2000)
            // alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 1));

            navigate("/ResetPassword")

            // const data = {
            //     newPassword: values.newPassword,
            //     confirmPassword: values.confirmPassword
            // };

            // axios.post('resetpassword', data).then(
            //     res => {
            //         console.log(res)
            //     }
            // ).catch(
            //     err => {
            //         console.log(err);
            //     }
            // )
        }
    });


    let navigate = useNavigate();

    return (
        <div id="forget-password-page">
            <div id="forget-password-container">
                <img src={logo1} alt="Application Logo" id="app-logo1" />
                <label id="reset-password-title"> Reset Password </label>
                <main>
                    <label id='email-address'> Email Address </label>
                    <Formik>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Enter your email..."
                                {...getFieldProps("email")}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="off"
                                className={errors.email && touched.email && "error"}
                            />
                            {errors.email && touched.email && (
                                <div className="input-error">{errors.email}</div>
                            )}
                            <button
                                id='reset-password'
                                type="submit"
                                disabled={isSubmitting}>
                                {isSubmitting ? "Loading" : "Reset Your Password"}
                            </button>
                            <button
                                id='return-to-login'
                                type="button"
                                onClick={() => { navigate("/Login") }}
                            >
                                Go back</button>
                        </form>
                    </Formik>
                </main>
            </div>
        </div>
    )
}

export default ForgetPassword;
