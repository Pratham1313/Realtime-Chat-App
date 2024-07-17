import React from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

function useSendMessage() {
  const { messages, setMessages, selectedConversation } = useConversation();

  function sendMessage(message) {
    const token = JSON.parse(localStorage.getItem("chat-user"));
    const sender = localStorage.getItem("user");

    axios
      .post(
        `http://localhost:5000/api/message/send/${selectedConversation._id}`,
        {
          message,
          token,
        }
      )
      .then((result) => {
        const now = new Date();

        setMessages([
          ...messages,
          {
            senderId: sender,
            recieverId: selectedConversation._id,
            message: message,
            updatedAt: now.toISOString(),
          },
        ]);
      })
      .catch((error) => {
        toast.error("SEND", error.message);
      });
  }
  return { sendMessage };
}

export default useSendMessage;
