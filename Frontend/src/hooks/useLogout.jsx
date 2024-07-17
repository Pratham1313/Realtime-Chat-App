import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

function useLogout() {
  const { setAuthUser } = useAuthContext();

  function logout() {
    axios
      .post("https://realtime-chat-app-l3gl.onrender.com/api/auth/logout")
      .then((result) => {
        if (result.status == 200) {
          toast.success("Logged Out");
          localStorage.removeItem("chat-user");
          localStorage.removeItem("user");

          setAuthUser(null);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }
  return { logout };
}

export default useLogout;
