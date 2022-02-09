import React, { useState, useRef, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import ChatMesage from "./ChatMesage";

export default function Chatroom({ db, auth }) {
  // reading messages
  const messagesRef = collection(db, "messages");
  const messageQuery = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const [messages, loading, error, snapshot] = useCollection(messageQuery); //, { idField: "id" } hook for updating mesages

  // sending messages
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  // scroll to new message
  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
    console.log(messages);
  }, [messages]);

  return (
    <>
      <main>
        {messages &&
          messages.docs
            .map((msg) => {
              // console.log(msg);
              return (
                <ChatMesage auth={auth} key={msg.id} message={msg.data()} />
              );
            })
            .reverse()}

        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}
