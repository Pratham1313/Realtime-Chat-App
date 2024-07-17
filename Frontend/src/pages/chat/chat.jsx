import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import Message from "./components/Messages/Message";

function Chat() {
  return (
    <div className="w-full h-screen relative flex mob:flex-none">
      <Sidebar />
      <Message />
    </div>
  );
}

export default Chat;
