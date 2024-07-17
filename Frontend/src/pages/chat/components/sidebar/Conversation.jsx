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
        className={`flex gap-3 items-center hover:bg-gray-700 rounded-md p-2 py-2 cursor-pointer px-4 border-b-[1px] m-[2px] ${
          isSelected ? "bg-gray-600 border-2 border-[#4a4a4a]" : ""
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
                isOnline
                  ? "text-green-300 hover:text-green-100 "
                  : " text-zinc-400 "
              }   `}
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
