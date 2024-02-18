import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { faker } from "@faker-js/faker";
import React, { useRef } from 'react'


import "./chat.css";

// For demo purposes. In a real app, you'd have real user data.
const NAME = faker.person.firstName();

export default function Chat () {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const [newMessageText, setNewMessageText] = useState("");
  const [messageType, setNewMessageType] = useState("action");
  
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }


  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className="chat">
      <div className="message-container">
        {messages?.map((message) => (
          <article
            key={message._id}
            className={message.author === NAME ? "message-mine" : ""}
          >
            <div>{message.author}</div>
            <p>{message.body}</p>
          </article>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await sendMessage({ body: newMessageText, author: NAME });
            setNewMessageText("");
          }}
        >
          <input
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Write a message…"
          />
          <button type="submit" disabled={!newMessageText}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
