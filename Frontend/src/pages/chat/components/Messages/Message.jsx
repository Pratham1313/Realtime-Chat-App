import React, { useEffect, useRef, useState } from "react";
import Conversations from "../sidebar/Conversations";
import useSendMessage from "../../../../hooks/useSendMessage";
import useGetMessages from "../../../../hooks/useGetMessage";
import Chat from "./Chat";
import useConversation from "../../../../zustand/useConversation";
import useListenMessages from "../../../../hooks/useListenMessages";
import { BsSend } from "react-icons/bs";

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

  //load latest chat
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  if (!selectedConversation) {
    return (
      <div className="w-full h-screen bg-[#212529] flex justify-center items-center text-white font-bold text-2xl">
        <div className="flex flex-col">
          <div
            className=" text-center
          "
          >
            Welcome
          </div>
          <div>Chat with your Friends </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[75.5%] h-screen bg-[#212529] mob:w-[100%] relative z-0">
      <div className="w-full h-[10%] bg-slate-500 text-xl border-2 border-[#4a4a4a] rounded-xl flex items-center justify-end px-5 text-white font-semibold shadow-md">
        To- {selectedConversation?.fullname}
      </div>

      <div className="w-full h-[80%] mob:h-[82%] overflow-auto custom-scrollbar px-10 mob:px-5 py-6">
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
        className="w-full h-[9%] mob:h-[7%] rounded-lg flex justify-center items-center "
        onSubmit={handleSubmit}
      >
        <input
          className="w-[45%] mob:w-[73%] h-[70%] resize-none rounded-s-full outline-none px-5 py-[10px] mob:py-[8px] custom-scrollbar flex border-2 border-r-0 border-[#4a4a4a]  bg-gray-700 text-white"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="w-[6.5%] h-[70%] mob:w-[15%]  rounded-r-full border-2 border-[#4a4a4a] border-l-0  bg-gray-700 text-white flex justify-center items-center">
          <BsSend className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default Message;
