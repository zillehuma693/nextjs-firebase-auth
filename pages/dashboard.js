import React from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/clientApp";
import cookie from "js-cookie";
import admin from "../config/firebase";

const auth = getAuth(app);
export async function getServerSideProps({ req, res }) {
  console.log(req.cookies.token);
  let response;
  if (req.cookies.token) {
    response = await admin
      .auth()
      .verifyIdToken(req.cookies.token)
      .then((resp) => {
        console.log(resp);
        return (response = resp);
      })
      .catch((error) => {
        return (response = "invalid");
      });
  } else {
    response = "";
    return {
      redirect: {
        permanent: false,
        destination: "/loginselector",
      },
    };
  }
  return {
    props: { token: response },
  };
}

const dashboard = (mytoken) => {
  console.log(mytoken);
  console.log(mytoken.token);
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log(auth);
        cookie.remove("token");
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  if (mytoken.token === "invalid") {
    signout();
  }
  return (
    <div className="main">
      <div className="dashboard">
        <header className="header">
          <nav className="navbar">
            <ul className="main-nav">
              <li className="nav-item active">Home</li>
              <li className="nav-item">Blog</li>
              <li className="nav-item">Gallery</li>
              <li className="nav-item">About Us</li>
              <li className="nav-item">Contact Us</li>
            </ul>
            <div className="indicator"></div>
          </nav>
        </header>
        <div>
          <h1>About us</h1>
          <h3>
            You can directly start using a fictional phone number in your
            application. This allows you to perform manual testing during
            development stages without running into quota issues or throttling.
            You can also test directly from an iOS simulator or Android emulator
            without Google Play Services installed. When you provide the
            fictional phone number and send the verification code, no actual SMS
            is sent. Instead, you need to provide the previously configured
            verification code to complete the sign in. On sign-in completion, a
            Firebase user is created with that phone number. The user has the
            same behavior and properties as a real phone number user, and can
            access Realtime Database/Cloud Firestore and other services the same
            way. The ID token minted during this process has the same signature
            as a real phone number user.
          </h3>
        </div>
        <div className="main-container">
          <div className="heading">
            <h1 className="heading__title">Gradient Banner Cards</h1>
            <p className="heading__credits">
              <a
                className="heading__link"
                target="_blank"
                href="https://dribbble.com/sl"
              >
                Design by Simon Lurwer on Dribbble
              </a>
            </p>
          </div>
          <div className="cards">
            <div className="card card-1">
              <div className="card__icon">
                <i className="fas fa-bolt"></i>
              </div>
              <p className="card__exit">
                <i className="fas fa-times"></i>
              </p>
              <h2 className="card__title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h2>
              <p className="card__apply">
                <a className="card__link" href="#">
                  Apply Now <i className="fas fa-arrow-right"></i>
                </a>
              </p>
            </div>
            <div className="card card-2">
              <div className="card__icon">
                <i className="fas fa-bolt"></i>
              </div>
              <p className="card__exit">
                <i className="fas fa-times"></i>
              </p>
              <h2 className="card__title">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </h2>
              <p className="card__apply">
                <a className="card__link" href="#">
                  Apply Now <i className="fas fa-arrow-right"></i>
                </a>
              </p>
            </div>
            <div className="card card-3">
              <div className="card__icon">
                <i className="fas fa-bolt"></i>
              </div>
              <p className="card__exit">
                <i className="fas fa-times"></i>
              </p>
              <h2 className="card__title">Ut enim ad minim veniam.</h2>
              <p className="card__apply">
                <a className="card__link" href="#">
                  Apply Now <i className="fas fa-arrow-right"></i>
                </a>
              </p>
            </div>
            <div className="card card-4">
              <div className="card__icon">
                <i className="fas fa-bolt"></i>
              </div>
              <p className="card__exit">
                <i className="fas fa-times"></i>
              </p>
              <h2 className="card__title">
                Quis nostrud exercitation ullamco laboris nisi.
              </h2>
              <p className="card__apply">
                <a className="card__link" href="#">
                  Apply Now <i className="fas fa-arrow-right"></i>
                </a>
              </p>
            </div>
            <div className="card card-5">
              <div className="card__icon">
                <i className="fas fa-bolt"></i>
              </div>
              <p className="card__exit">
                <i className="fas fa-times"></i>
              </p>
              <h2 className="card__title">
                Ut aliquip ex ea commodo consequat. Duis aute irure dolor.
              </h2>
              <p className="card__apply">
                <a className="card__link" href="#">
                  Apply Now <i className="fas fa-arrow-right"></i>
                </a>
              </p>
            </div>
            <div className="card card-1">
              <div className="card__icon">
                <i className="fas fa-bolt"></i>
              </div>
              <p className="card__exit">
                <i className="fas fa-times"></i>
              </p>
              <h2 className="card__title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h2>
              <p className="card__apply">
                <a className="card__link" href="#">
                  Apply Now <i className="fas fa-arrow-right"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="img-container-grid">
              <div className="smallsquare">
                <img
                  src="https://cdn.pixabay.com/photo/2018/05/28/22/11/message-in-a-bottle-3437294__340.jpg"
                  className="img-grid-c"
                />
              </div>
              <div className="smallsquare">
                <img
                  src="https://media.istockphoto.com/photos/view-of-sydney-harbour-australia-picture-id535455441?k=6&m=535455441&s=612x612&w=0&h=jVkW0bOqvffn2SzvUdncgkwHGScJRzak0oaQGij__h8="
                  className="img-grid-c"
                />
              </div>
              <div className="h_rectangle">
                <img
                  src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  className="img-grid-c"
                />
              </div>
              <div className="smallsquare">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WnzXzbr2hiB8lPq3n_p5fnQdvOMc3Ouummyk11uVylX-7rtdXA"
                  className="img-grid-c"
                />
              </div>
              <div className="bigsquare">
                <img
                  src="https://thumbs-prod.si-cdn.com/N-_fU5xNOvR2T25teuPAdtGkBhY=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/90/b2/90b2dfe5-a9ab-4821-9ccc-45ae1d52fa8a/blackholewithclouds_c-1-941x519.jpg"
                  className="img-grid-c"
                />
              </div>
              <div className="bigsquare_blank">
                <div className="inner_square">
                  <img
                    src="https://www.w3schools.com/w3css/img_lights.jpg"
                    className="img-grid-c"
                  />
                </div>
                <div className="inner_square">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-oo8-jn28YVesncpNZ4cBHocvHtKLwzmpVDbq1k7KNa5jEiL"
                    className="img-grid-c"
                  />
                </div>
                <div className="inner_square">
                  <img
                    src="https://media.cntraveller.in/wp-content/uploads/2018/10/GettyImages-990972132-866x487.jpg"
                    className="img-grid-c"
                  />
                </div>
                <div className="inner_square">
                  <img
                    src="https://www.w3schools.com/howto/img_snow.jpg"
                    className="img-grid-c"
                  />
                </div>
              </div>
              <div className="v_rectangle">
                <img
                  src="https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                  className="img-grid-c"
                />
              </div>
            </div>
          </div>
        </section>

        <button type="button" className="cancelbtn" onClick={signout}>
          {" "}
          logout{" "}
        </button>
      </div>
    </div>
  );
};

export default dashboard;
