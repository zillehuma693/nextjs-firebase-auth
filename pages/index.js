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
export default function Home() {
  return (
    <div className="maincontainer">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="mainform">
        <h3>welcome </h3>

        <Link href="/loginselector">
          <button>Login</button>
        </Link>

        <Link href="/signinselector">
          <button>Signup</button>
        </Link>
      </form>
    </div>
  );
}
