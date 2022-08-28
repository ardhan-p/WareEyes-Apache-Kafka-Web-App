import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../../Images/app_icon.png";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./ForgetPassword.css";
import { Helmet } from "react-helmet";
import config from "../../Context/serverProperties.json";

// forget password page
function ForgetPassword() {
  const {
    values,
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
    },

    // validate user submission to check if email has been inputted
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
    }),

    // on form submit function
    onSubmit(values, { resetForm, setSubmitting }) {
      console.log("Submitting");
      console.log(values);
      setTimeout(() => {
        resetForm();
        setSubmitting(false);
      }, 2000);

      const data = {
        email: values.email,
      };

      // sends an HTTP POST request with email data to validate if user is found in database
      axios
        .post(config["backend-url"] + "/api/v1/login/validateEmail", data, {
          auth: {
            username: "user",
            password: "password",
          },
        })
        .then((res) => {
          console.log(res);
          navigate("/ResetPassword", {state:{email:values.email}});
        })
        .catch((err) => {
          alert("Email doesn't exist!");
          console.log(err);
        });
    },
  });

  let navigate = useNavigate();

  return (
    <div id="forget-password-page">
      <Helmet bodyAttributes={{ style: "background-color : #4869B2" }} />
      <div id="forget-password-container">
        <img src={logo1} alt="Application Logo" id="app-logo1" />
        <label id="reset-password-title"> Reset Password </label>
        <main>
          <label id="email-address"> Email Address </label>
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
              <button id="reset-password" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading" : "Reset Your Password"}
              </button>
              <button
                id="return-to-login"
                type="button"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Go back
              </button>
            </form>
          </Formik>
        </main>
      </div>
    </div>
  );
}

export default ForgetPassword;
