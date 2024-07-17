import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      const token = JSON.parse(localStorage.getItem("chat-user"));
      setLoading(true);
      axios
        .get(
          `https://realtime-chat-app-l3gl.onrender.com/api/message/${selectedConversation._id}`,
          {
            params: { token: token },
          }
        )
        .then((result) => {
          setMessages(result.data);
        })
        .catch((err) => {
          toast.error("GET", err.message);
        })
        .finally(setLoading(false));
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id]);

  return { messages, loading };
};
export default useGetMessages;
