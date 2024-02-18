import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { sendAction } from "@/app/api";

import "./chat.css";
import classes from "./segmented_control.module.css";
import { TextInput, SegmentedControl, Progress, Tooltip } from "@mantine/core";

const THRESHOLD_TO_OPTIMIZE = 20

export default function Chat ({ name, userId }) {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const [newMessageText, setNewMessageText] = useState("");
  const [messageType, setMessageType] = useState("chat");

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const handleNewMessage = async (e) => {
    e.preventDefault();
    await sendMessage({ body: newMessageText, author: name });

    // If action, send to backend.
    if (messageType === "action") {
      console.log("SENDING ACTION!")
      await sendAction(userId, newMessageText)
    }

    // Clear message console.
    setNewMessageText("");
  }

  const progressValue = messages?.length / THRESHOLD_TO_OPTIMIZE * 100

  return (
    <div className="chat">
      <Progress color="orange" radius="xl" size="md" value={progressValue} animated w="100%" mb="lg" />

      <div className="message-container">
        {messages?.map((message) => (
          <article
            key={message._id}
            className={message.author === name ? "message-mine" : ""}
          >
            <div>{message.author}</div>
            <p>{message.body}</p>
          </article>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="form-container"
        onSubmit={handleNewMessage}
      >
        <TextInput
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Write a message..."
          size="xl"
          radius="xl"
          w="95%"
        />
        <Tooltip label="'None', 'Switch 0', 'Switch 1', 'Switch 2', 'Work', 'Play', 'Invest'">
          <SegmentedControl
            radius="xl"
            size="lg"
            value={messageType}
            onChange={setMessageType}
            data={['chat', 'action']}
            classNames={classes}
            w="40%"
          />
        </Tooltip>
        <button type="submit" hidden />
      </form>
    </div>
  );
}
