import React, { useState, useEffect } from "react";
import { useSession } from "../Context/UserContext";
import { firestore } from "../firebase/config";
import "./Profile.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSession();
  const [userDoc, setUserDoc] = useState();

  const initialValues = {
    name: userDoc?.name,
    email: userDoc?.email,
    phone: userDoc?.phone,
    city: userDoc?.city,
    state: userDoc?.state,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("Invalid Email Format"),
    phone: Yup.string().max(10).min(10),
  });

  useEffect(() => {
    const docRef = firestore.collection("users").doc(user.uid);
    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const docData = doc.data();
        console.log("Doc: data", docData);
        setUserDoc(docData);
      }
    });
  }, [user.uid]);

  if (!userDoc) {
    return null;
  }

  return (
    <div className="profile">
      <div className="profile-inner">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => {
            console.log("Formik : ", formik);
            return (
              <Form className="form1">
                <div className="row1">
                  <div className="form-controls1">
                    <label>Name</label>
                    <Field
                      id="firstname"
                      className="input"
                      type="text"
                      name="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="error-msg"
                    />
                  </div>
                </div>
                <div className="form-controls1">
                  <label>Email</label>
                  <Field className="input" type="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="error-msg"
                  />
                </div>
                <div className="form-controls1">
                  <label>Phone</label>
                  <Field className="input" type="text" name="phone" />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="error-msg"
                  />
                </div>

                <div className="form-controls1">
                  <label>City</label>
                  <Field className="input" type="text" name="city" />
                </div>

                <div className="form-controls1">
                  <label>State</label>
                  <Field className="input" type="text" name="state" />
                </div>

                <div className="login-buttons">
                  <button type="submit" className="login-direct">
                    Register
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
