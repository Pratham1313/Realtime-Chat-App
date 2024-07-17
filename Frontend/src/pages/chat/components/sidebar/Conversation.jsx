import React from "react";
import useConversation from "../../../../zustand/useConversation";
import { useSocketContext } from "../../../../context/SocketContext";

function Conversation({ conversation }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <div className=" ">
      <div
        className={`flex gap-2 items-center hover:bg-sky-400 rounded p-2 py-1 cursor-pointer px-4 border-b-[1px] m-[2px] ${
          isSelected ? "bg-sky-500" : ""
        } `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex-row">
            <p className="font-bold text-gray-200">{conversation.username}</p>
            <span
              className={`text-sm  ${
                isOnline ? "text-green-600" : " text-zinc-400"
              } `}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
