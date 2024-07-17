import React, { useEffect, useRef, useState } from "react";
import Conversations from "../sidebar/Conversations";
import useSendMessage from "../../../../hooks/useSendMessage";
import useGetMessages from "../../../../hooks/useGetMessage";
import Chat from "./Chat";
import useConversation from "../../../../zustand/useConversation";
import useListenMessages from "../../../../hooks/useListenMessages";

function Message() {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();
  useListenMessages();

  // Send message
  async function handleSubmit(e) {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  }

  // Get messages
  const { messages, loading } = useGetMessages();
  console.log("Message", messages);

  //load latest chat
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  if (!selectedConversation) {
    return (
      <div className="w-full h-screen bg-slate-800 flex justify-center items-center text-white font-bold text-2xl">
        Welcome
      </div>
    );
  }

  return (
    <div className="w-[75.5%] h-screen bg-slate-800 mob:w-[100%] relative z-0">
      <div className="w-full h-[7%] bg-slate-500 rounded-lg flex items-center justify-end px-5 text-white font-semibold shadow-md">
        To: {selectedConversation.username}
      </div>

      <div className="w-full h-[83%] mob:h-[85%] overflow-auto custom-scrollbar px-10 mob:px-5 py-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <Chat message={message} key={message._id} />
          ))
        ) : (
          <div className="flex h-full justify-center items-center">
            Start Conversation
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Search */}
      <form
        className="w-full h-[9%] mob:h-[7%] rounded-lg flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="w-[60%] mob:w-[73%] h-[70%] resize-none rounded-s-full outline-none px-5 py-[10px] mob:py-[8px] custom-scrollbar flex"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="w-[10%] h-[70%] mob:w-[20%] bg-slate-600 rounded-r-full text-white">
          Send
        </button>
      </form>
    </div>
  );
}

export default Message;
