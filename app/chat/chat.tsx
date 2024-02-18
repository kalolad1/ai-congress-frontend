import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { optimize, sendAction, sendFeedback, saveChat } from "@/app/api";

import "./chat.css";
import classes from "./segmented_control.module.css";
import { TextInput, SegmentedControl, Progress, Tooltip, Button } from "@mantine/core";

const THRESHOLD_TO_OPTIMIZE = 20

export default function Chat ({ name, userId }) {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const [newMessageText, setNewMessageText] = useState("");
  const [messageType, setMessageType] = useState("chat");
  const [isFeedbackFinished, setIsFeedbackFinished] = useState(false);
  const router = useRouter();

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

    if (isSimulationFinished) {
      console.log("SENDING FEEDBACK!")
      await sendFeedback(userId, newMessageText)
      setIsFeedbackFinished(true)
    }

    // Clear message console.
    setNewMessageText("");
  }

  const handleOptimizeButtonClick = async () => {
    console.log("OPTIMIZING!")
    await saveChat(messages)
    await optimize()
    router.push("/visualization.html")
  }

  const progressValue = messages?.length / THRESHOLD_TO_OPTIMIZE * 100
  const isSimulationFinished = progressValue > 100;

  let submitButton;
  if (isFeedbackFinished) {
    submitButton =
      <Button onClick={handleOptimizeButtonClick} className="box-shadow" justify="center" radius="lg" size="lg" c="green" variant="default">Optimize!</Button>
  } else if (isSimulationFinished) {
    submitButton = <SegmentedControl
      radius="xl"
      size="lg"
      value='feedback'
      data={['feedback']}
      classNames={classes}
      w="20%"
    />
  }
  else {
    submitButton = <Tooltip label="'None', 'Switch 0', 'Switch 1', 'Switch 2', 'Work', 'Play', 'Invest'">
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
  }


  return (
    <div className="chat">
      {isSimulationFinished ?
        <Button className="box-shadow" justify="center" radius="lg" size="lg" variant="default">
          Simulation finished! Please provide your feedback related to your values, preferences, and objectives.
        </Button> :
        <Progress color="orange" radius="xl" size="md" value={progressValue} animated w="100%" mb="lg" />}

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

        {submitButton}
        <button type="submit" hidden />
      </form>
    </div>
  );
}
