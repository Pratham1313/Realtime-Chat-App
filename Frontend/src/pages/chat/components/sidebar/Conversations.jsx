import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axios from "axios";
import toast from "react-hot-toast";

const Conversations = ({ search }) => {
  const [conversations, setConversations] = useState([]);
  const [dup_conversations, dup_setConversations] = useState([]);

  const token = JSON.parse(localStorage.getItem("chat-user"));
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/user/get", {
        params: { token: token },
      })
      .then((result) => {
        setConversations(result.data);
        dup_setConversations(result.data);
      })
      .catch((error) => {
        toast.error("GET Conversations", error.message);
      });
  }, []);

  useEffect(() => {
    let new_conversation = dup_conversations.filter((arr) => {
      const lowercase_name = String(arr.username).toLowerCase();
      let lowercase_search = search.toLocaleLowerCase();
      return lowercase_name.includes(lowercase_search);
    });

    setConversations(new_conversation);
  }, [search]);

  return (
    <div className="w-full h-full py-2 flex flex-col overflow-auto custom-scrollbar ">
      {conversations.map((conversation, idx) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
};

export default Conversations;
