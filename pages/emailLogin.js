import React from "react";
import Link from "next/link";
import { useState } from "react";
import app from "../firebase/clientApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import cookie from "js-cookie";
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
const emaillogin = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        cookie.set("token", user.accessToken);
        console.log(user);
        window.location.href = "/dashboard";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  };

  return (
    <div className="maincontainer">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form>
        <h3>Login</h3>
        <div className="container">
          <label>
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="uname"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" onClick={(e) => signin(e)}>
            Login
          </button>
        </div>

        <div className="container">
          <Link href="/signinselector">
            <button type="button" className="cancelbtn">
              Sigin
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

export default emaillogin;
