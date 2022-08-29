import React from "react";
import Link from "next/link";
import { useState } from "react";
import app from "../firebase/clientApp";
import cookie from "js-cookie";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import admin from "../config/firebase";
export async function getServerSideProps({ req, res }) {
  console.log(req.cookies.token);
  let response;
  if (req.cookies.token) {
    response = await admin
      .auth()
      .verifyIdToken(req.cookies.token)
      .then((resp) => {
        console.log(resp);
        return resp;
      });
    console.log("responce is ", response);
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }
  return {
    props: { token: response || "" },
  };
}
const emailsignin = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        cookie.set("token", user.accessToken);
        window.location.href = "/dashboard";

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div className="maincontainer">
      <div className="background">
        <div className="shape" id="shape"></div>
        <div className="shape" id="last-shape"></div>
      </div>

      <form className="signinform">
        <h3>Signup</h3>
        <div className="container">
          <label>
            <b>Firstname</b>
          </label>
          <input
            type="text"
            placeholder="Enter First name"
            name="uname"
            required
          />
          <label>
            <b>Lastname</b>
          </label>
          <input
            type="text"
            placeholder="Enter Last name"
            name="uname"
            required
          />
          <label>
            <b>
              Email<b style={{ color: "red" }}> *</b>
            </b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="uname"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            <b>
              Password<b style={{ color: "red" }}> *</b>
            </b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" onClick={(e) => signup(e)}>
            Signup
          </button>
        </div>

        <div className="container">
          <Link href="/loginselector">
            <button type="button" className="cancelbtn">
              login
            </button>
          </Link>
          <span className="psw">
            Forgot <a href="#">password?</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default emailsignin;
