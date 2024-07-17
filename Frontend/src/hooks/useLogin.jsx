import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    try {
      const result = await axios.post(
        "https://realtime-chat-app-l3gl.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );

      if (result.status === 200) {
        localStorage.setItem("chat-user", JSON.stringify(result.data.tokenn));
        localStorage.setItem("user", result.data._id);
        localStorage.setItem("user-info", JSON.stringify(result.data));

        setAuthUser(result.data._id);
        toast.loading("Navigating to Chat page");
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
          toast.dismiss();
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogin;
