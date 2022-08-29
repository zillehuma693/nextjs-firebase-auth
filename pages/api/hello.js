import admin from "../../config/firebase";
import cookie from "js-cookie";

export default async function handler() {
  const firebase = admin.auth();
  const token = cookie.get("token");
  console.log(token);
  return firebase
    .verifyIdToken(token)
    .then(function (decodedToken) {
      console.log("true from api");
      return true;
      // ...
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
}
