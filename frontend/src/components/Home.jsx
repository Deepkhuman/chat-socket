import { Button, Card, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../Axios/axiosClient";
import { handleError, handleSuccess } from "../../utils";
import Sidebar from "../../Mui Components/Sidebar";
import { Chatbox } from "../chat/mainchat";
import io from "socket.io-client";
import socket from "socket.io-client";
const PATH = "http://localhost:3000";

const Home = () => {
  const [loggedinuser, setloggedinUser] = useState("");
  const navigate = useNavigate();
  const [toastShow, SetToastshow] = useState(false);
  const [Isconnected, SetIsconnected] = useState(false);
  const socketRef = useRef(null);

  const location = useLocation();

  const userDetails = location.state?.userData;

  console.log(location.state);

  useEffect(() => {
    socketRef.current = io.connect(PATH, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      SetIsconnected(true);
      console.log("Socket connected with ID: ", socketRef.current.id);
      if (userDetails) {
        socketRef.current.emit("ADD_USER", userDetails);
        console.log("----------------->");
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket disconnected on component unmount");
      }
    };
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedinUSer");

    if (!token) {
      navigate("/login");
      handleError("You must be logged in to access this page");
    } else {
      setloggedinUser(user);
      verifyToken(token);
    }
  }, [navigate]);

  async function verifyToken(token) {
    try {
      const response = await axiosClient.get("/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
    } catch (error) {
      handleError("Invalid session. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("loggedinUSer");
      navigate("/login");
    }
  }

  async function handlelogout() {
    try {
      if (socketRef.current) {
        socketRef.current.emit("LOGOUT");
        socketRef.current.disconnect();
        SetIsconnected(false);
        console.log("Socket disconnected");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("loggedinUSer");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Paper
        square
        elevation={0}
        sx={{ width: "100vw", display: "flex", height: "100vh" }}
      >
        <Button onClick={() => handlelogout()}>cick</Button>
        <Sidebar />
        <Chatbox />
      </Paper>
    </>
  );
};

export default Home;
