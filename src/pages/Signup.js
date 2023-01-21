import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signup, signInWithGoogle } from "../firebase/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import "./Signup.css";

function GridComplexExample(props) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const { firstname, lastname, email, password } = values;
    try {
      setIsLoading(true);
      const user = await signup(firstname, lastname, email, password);
      toast.success("Successfully Registered");
      if (user) {
        setIsLoading(false);
        navigate(`/profile/${user.uid}`, { replace: true });
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Failed Registered");
    }
  };

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("Invalid Email Format"),
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
          src="images/background/signup.jpg"
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
                <label>Firstname</label>
                <Field
                  id="firstname"
                  className="input"
                  type="text"
                  name="firstname"
                />
                <ErrorMessage
                  name="firstname"
                  component="p"
                  className="error-msg"
                />
              </div>
              <div className="form-controls">
                <label>Lastname</label>
                <Field className="input" type="text" name="lastname" />
                <ErrorMessage
                  name="lastname"
                  component="p"
                  className="error-msg"
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
                  Register
                </button>
                <div className="or-cont">
                  <hr className="horline" />
                </div>
                <button
                  className="login-google"
                  onClick={async () => {
                    signInWithGoogle();
                  }}
                >
                  <i className="fa-brands fa-google"></i> - Google
                </button>

                <Link to="/login" className="login-redirect">
                  Login
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default GridComplexExample;
