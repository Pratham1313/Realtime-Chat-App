import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login.jsx";
import Signup from "./pages/auth/signup.jsx";
import "./App.css";
import Chat from "./pages/chat/chat.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext.jsx";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        ></Route>
        <Route
          path="/"
          element={authUser ? <Chat /> : <Navigate to={"/login"} />}
        ></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
