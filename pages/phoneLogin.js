import React from "react";
import Link from "next/link";
import { useState } from "react";
import app from "../firebase/clientApp";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
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
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
const phonelogin = () => {
  const auth = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [Otp, setOtp] = useState("");
  const [confirmationResult, setconfirmationResult] = useState();
  const recaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };
  const genrateOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await recaptcha(phoneNumber);
      console.log(response);
      setconfirmationResult(response);
    } catch (err) {
      alert(err.message);
    }
  };
  const verifyOtp = (e) => {
    e.preventDefault();
    console.log(confirmationResult);
    confirmationResult
      .confirm(Otp)
      .then((result) => {
        const user = result.user;
        console.log(user);
        cookie.set("token", user.accessToken);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        alert(error);
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
            <b>Phone Number</b>
          </label>
          <PhoneInput
            defaultCountry="PK"
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter Phone Number"
          />

          <div id="recaptcha-container" style={{}} />
          <label>
            <b>OTP</b>
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            name="psw"
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <div className="container">
          <button onClick={(e) => genrateOTP(e)}>SendOTP</button>
          <button onClick={verifyOtp}>Login</button>
          <span className="psw">
            Forgot <a href="#">password?</a>
          </span>
        </div>

        <Link href="/signinselector">
          <button type="button" className="cancelbtn">
            Sigin
          </button>
        </Link>
      </form>
    </div>
  );
};

export default phonelogin;
