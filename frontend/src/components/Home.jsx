import { Button, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "../../Mui Components/Sidebar";
import { handleError } from "../../utils";
import axiosClient from "../Axios/axiosClient";
import { Chatbox } from "../chat/mainchat";

import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser, setSocketConnection, setRoomData, addMessage, setOnlineUsers, setAllmsg } from "../../redux/slice/index";

const PATH = "http://localhost:3000";

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { loggedInUser, messages } = useSelector((state) => state.appstate);
  console.log(loggedInUser);

  const socketRef = useRef(null);

  const location = useLocation();
  const userDetails = location.state?.userData;

  useEffect(() => {
    socketRef.current = io.connect(PATH, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      dispatch(SetIsconnected(true));
      console.log("Socket connected with ID: ", socketRef.current.id);
      if (userDetails) {
        socketRef.current.emit("ADD_USER", userDetails);
        socketRef.current.on("USER_ADDED", (data) => {
          dispatch(setOnlineUsers(data));
        });
        socketRef.current.on("RECEIVE_MSG", (data) => {
          dispatch(setAllmsg((prev) => [...prev, data]));
        });
        socketRef.current.emit("UPDATE_READ", allmsg);

        socketRef.current.on("UPDATE_READ", (data) => {
          dispatch(setAllmsg((prev) => [...prev, data]))
        });
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket disconnected on component unmount");
      }
    };
  }, [dispatch, userDetails, messages]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedinUSer");

    if (!token) {
      navigate("/login");
      handleError("You must be logged in to access this page");
    } else {
      dispatch(setOnlineUsers(user));
      verifyToken(token);
    }
  }, [navigate, dispatch]);

  async function verifyToken(token) {
    try {
      const response = await axiosClient.get("/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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
        dispatch(setSocketConnection(false));
        console.log("Socket disconnected");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("loggedinUSer");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSendmsg = (message, image) => {
    if (socketRef.current.connected) {
      const data = {
        message,
        image: image == undefined ? null : image,
        receiver: roomData.receiver,
        sender: loggedInUser,
        isRead: false,

      };
      console.log("image", image)
      socketRef.current.emit("SEND_MSG", data);
      dispatch(setAllmsg((prev) => [...prev, data]))
    }
  };

  return (
    <>
      <Paper
        square
        elevation={0}
        sx={{ width: "100vw", display: "flex", height: "100vh" }}
      >
        <Sidebar
          user={userDetails}
          onlineusers={onlineusers}
          roomData={roomData}
          SetroomData={SetroomData}
          button={
            <Button
              sx={{ bgcolor: "red", color: "white" }}
              onClick={() => handlelogout()}
            >
              Logout
            </Button>
          }
        />
        <Chatbox
          SetAllmsg={SetAllmsg}
          handleSendmsg={handleSendmsg}
          messages={allmsg}
          user={userDetails}
          roomData={roomData}
        />
      </Paper>
    </>
  );
};

export default Home;
