import React from "react";

export default function SignOut({ auth }) {
  function signOutFromGoogle() {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    auth.currentUser && <button onClick={signOutFromGoogle}>sign Out</button>
  );
}
