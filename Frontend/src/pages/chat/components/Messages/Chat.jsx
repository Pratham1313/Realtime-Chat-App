import React from "react";
import useConversation from "../../../../zustand/useConversation";

function Chat({ message }) {
  const { selectedConversation } = useConversation();
  let sender = localStorage.getItem("user");
  let sender_info = JSON.parse(localStorage.getItem("user-info"));

  const fromMe = message.senderId === sender;
  const charClassname = fromMe ? "chat-end" : "chat-start";
  const Profile_photo = fromMe
    ? sender_info.profilePic
    : selectedConversation.profilePic;

  const username = fromMe
    ? sender_info.username
    : selectedConversation.username;

  const background = fromMe ? "bg-blue-500" : "bg-gray-600";

  let extract_time = formatTime(message.updatedAt);

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${charClassname}`}>
      <div className="chat-image avatar ">
        <div className="w-10 rounded-full ">
          <img alt="Tailwind CSS chat bubble component" src={Profile_photo} />
        </div>
      </div>
      <div
        className={`chat-bubble flex flex-col ${background} ${
          shakeClass ? "shake" : ""
        }`}
      >
        <div className=" font-semibold text-start text-zinc-800 select-none ">
          ~{username}
        </div>
        <div className=" text-white min-w-48">{message.message}</div>
      </div>
      <div className="chat-footer opacity-50 text-white">{extract_time}</div>
    </div>
  );
}

export default Chat;

function formatTime(timestamp) {
  const now = new Date(timestamp);

  // Extract hours, minutes, and period (AM/PM)
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Pad minutes with leading zeros if necessary
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  // Format the final string
  const formattedTime = `${hours}:${minutesStr} ${ampm}`;

  return formattedTime;
}
