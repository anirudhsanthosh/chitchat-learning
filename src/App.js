import React, { useEffect, useRef, useState } from "react";

// importing firebase sdk
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//importing firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";

// importing components
import ChatRoom from "./component/ChatRoom";
import SignIn from "./component/SignIn";
import SignOut from "./component/SignOut";

const firebaseConfig = {
  apiKey: "AIzaSyAMaQmU4YVByjTMcT3DEimEw0aRPXvZ4ss",
  authDomain: "react-firebase-chat-learning.firebaseapp.com",
  projectId: "react-firebase-chat-learning",
  storageBucket: "react-firebase-chat-learning.appspot.com",
  messagingSenderId: "170076794141",
  appId: "1:170076794141:web:cbfb5c51bfaf8757a545f4",
  measurementId: "G-SY56MH2DP7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>ChitChat</h1>
        <SignOut auth={auth} />
      </header>

      <section>
        {user ? <ChatRoom db={db} auth={auth} /> : <SignIn auth={auth} />}
      </section>
    </div>
  );
}
