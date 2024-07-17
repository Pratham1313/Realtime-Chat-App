import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const signup = async (
    username,
    fullname,
    password,
    confirmPassword,
    gender
  ) => {
    console.log(username, fullname, password, confirmPassword, gender);
    const success = handleInputError(
      username,
      fullname,
      password,
      confirmPassword,
      gender
    );
    if (!success) return;

    setLoading(true);

    try {
      const result = await axios.post("http://localhost:5000/api/auth/signup", {
        fullname,
        username,
        password,
        confirmPassword,
        gender,
      });

      if (result.status === 201) {
        toast.loading("Navigating to login page");
        toast.success("Signup successful!");

        setTimeout(() => {
          navigate("/login");
          toast.dismiss();
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
}

export default useSignup;

function handleInputError(
  username,
  fullname,
  password,
  confirmPassword,
  gender
) {
  if (!username || !fullname || !password || !confirmPassword || !gender) {
    console.log("field");
    toast.error("Please fill all fields!!!");
    return false;
  }

  if (password !== confirmPassword) {
    console.log("pass not match");
    toast.error("Passwords do not match!!!");
    return false;
  }

  if (password.length < 8) {
    console.log("pass len");
    toast.error("Password should have at least 8 characters!!!");
    return false;
  }

  return true;
}
