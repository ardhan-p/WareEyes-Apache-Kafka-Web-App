import { React } from "react";
import { useNavigate, useLocation } from "react-router";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import logo1 from "../../Images/app_icon.png";
import "./ResetPassword.css";
import { HiOutlineLockClosed } from "react-icons/hi";
import axios from "axios";
import { Helmet } from "react-helmet";

function togglePassword() {
  var x = document.getElementById("new-password");
  var y = document.getElementById("eye-open");
  var z = document.getElementById("eye-close");

  if (x.type === "password") {
    x.type = "text";
    y.style.display = "block";
    z.style.display = "none";
  } else {
    x.type = "password";
    y.style.display = "none";
    z.style.display = "block";
  }
}

function toggleConfirmPassword() {
  var x = document.getElementById("confirm-password");
  var y = document.getElementById("eye-open1");
  var z = document.getElementById("eye-close1");

  if (x.type === "password") {
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
  const location = useLocation();

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      password: "",
      email: location.state.email,
    },

    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
      confirmPassword: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number")
        .oneOf([Yup.ref("newPassword")], "Password must match"),
    }),

    onSubmit(values, { resetForm, setSubmitting }) {
      //console.log(values);
      setTimeout(() => {
        resetForm();
        setSubmitting(false);
      }, 2000);

      const data = {
        email: location.state.email,
        password: values.confirmPassword,
      };

      console.log(data);

      axios
        .post("http://localhost:8080/api/v1/login/updatePassword", data, {
          auth: {
            username: "user",
            password: "password",
          },
        })
        .then((res) => {
          if (res.data === 1) {
            alert("Password successfully changed!");
            navigate("/Login");
            console.log(res);
          } else {
            alert("Failed to reset password!");
            console.log(res);
          }
        })
        .catch((err) => {
          alert("Failed to reset password!");
          console.log(err);
        });
    },
  });

  let navigate = useNavigate();

  return (
    <div id="reset-password-page">
      <Helmet bodyAttributes={{ style: "background-color : #4869B2" }} />
      <div id="reset-password-container">
        <img src={logo1} alt="Application Logo" id="app-logo1" />
        <label id="create-new-password-title"> Create New Password </label>
        <div>
          <label id="new-password-text" htmlFor="password">
            Password
          </label>
          <Formik>
            <form onSubmit={handleSubmit}>
              <input
                name="new-password"
                type="password"
                id="new-password"
                placeholder="Enter new password..."
                {...getFieldProps("newPassword")}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                className={errors.newPassword && touched.newPassword && "error"}
                icon={<HiOutlineLockClosed />}
              />
              {errors.newPassword && touched.newPassword && (
                <div className="newPassword-error">{errors.newPassword}</div>
              )}
              <span className="eye" onClick={togglePassword}>
                <i id="eye-open" className="fa fa-eye"></i>
                <i id="eye-close" className="fa fa-eye-slash"></i>
              </span>
              <label id="confirm-password-text" htmlFor="password">
                Confirm Password
              </label>
              <input
                name="confirm-password"
                type="password"
                id="confirm-password"
                placeholder="Enter confirm password..."
                {...getFieldProps("confirmPassword")}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                className={
                  errors.confirmPassword && touched.confirmPassword && "error"
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="input-confirmPassword-error">
                  {errors.confirmPassword}
                </div>
              )}
              <span className="eye1" onClick={toggleConfirmPassword}>
                <i id="eye-open1" className="fa fa-eye"></i>
                <i id="eye-close1" className="fa fa-eye-slash"></i>
              </span>
              <button id="confirm-btn" type="submit" disabled={isSubmitting}>
                {" "}
                {isSubmitting ? "Loading" : "Confirm"}
              </button>
              <button
                id="return-to-login"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                {" "}
                Go back
              </button>
            </form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
