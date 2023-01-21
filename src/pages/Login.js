import { useState } from "react";
import { login, signInWithGoogle } from "../firebase/auth";

import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      setIsLoading(true);
      const user = await login(email, password);

      if (user) {
        setIsLoading(false);
        // props.history.push(`/profile/${user.uid}`);
        navigate(`/profile/${user.uid}`, { replace: true });
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid email format"),
    password: Yup.string().required("Required"),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",

        alignItems: "center",
        background:
          "radial-gradient(circle, rgba(243,246,249,1) 0%, rgba(205,213,224,1) 100%)",
      }}
    >
      <div className="img-cont">
        <img
          src="images/background/login.jpg"
          alt="img-back"
          className="img-back"
        />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          console.log("Formik : ", formik);
          return (
            <Form className="form">
              <div className="logo-cont">
                <img
                  src="images/logos/logo-white.png"
                  className="logo"
                  alt="logo"
                />
              </div>

              <div className="form-controls">
                <label>Email</label>
                <Field className="input" type="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="error-msg"
                />
              </div>
              <div className="form-controls">
                <label>Password</label>
                <Field className="input" type="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="error-msg"
                />
              </div>

              <div className="login-buttons">
                <button
                  type="submit"
                  className="login-direct"
                  // disabled={
                  //   formik.isSubmitting || !(formik.dirty && formik.isValid)
                  // }
                >
                  Login
                </button>
                <div className="or-cont">
                  <hr className="horline" />
                  {/* <p> or </p> */}
                  {/* <hr className="horline" /> */}
                </div>
                <button
                  className="login-google"
                  onClick={async () => {
                    signInWithGoogle();
                  }}
                >
                  <i className="fa-brands fa-google"></i> - Google
                </button>

                <Link to="/signup" className="login-redirect">
                  Register
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
