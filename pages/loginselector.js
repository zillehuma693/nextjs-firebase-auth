import Link from "next/link";
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
export default function LoginSelector(token) {
  return (
    <div className="maincontainer">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="mainform">
        <h3>Login with </h3>

        <Link href="/phoneLogin">
          <button>Phone</button>
        </Link>

        <Link href="/emailLogin">
          <button>Email</button>
        </Link>
      </form>
    </div>
  );
}
