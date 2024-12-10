import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chatarea from "./Chatarea";
import Footer from "./Footer";
import Header from "./Header";
import axiosClient from "../../Axios/axiosClient";

const Chatbox = ({
  roomData,
  SetroomData,
  handleSendmsg,
  messages,
  user,
  SetAllmsg,
}) => {
  const [room, Setroom] = useState();
  useEffect(() => {
    Setroom(roomData.room);
  }, [roomData.room]);

  const data = {
    senderId: user?.id,
    receiverId: roomData?.receiver?.id,
  };

  useEffect(() => {
    if (data?.senderId && data?.receiverId) {
      console.log("Fetching messages with data:", data);

      SetAllmsg([]);

      axiosClient
        .post("/getAllMessages", data)
        .then((res) => {
          console.log("Fetched Messages:", res);

          if (res && res.length > 0) {
            SetAllmsg((prev) => [...res, ...prev]);
          } else {
            SetAllmsg([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [user?.id, roomData?.receiver?.id, SetAllmsg]);

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        height: "100%",
        marginLeft: "3px",
        flexDirection: "column",
      }}
    >
      {room ? (
        <>
          <Header roomData={roomData} />
          <Chatarea
            user={user}
            SetroomData={SetroomData}
            roomData={roomData}
            messages={messages}
          />
          <Footer handleSendmsg={handleSendmsg} />
        </>
      ) : (
        <>Please Select Among Users to Chat with Them</>
      )}
    </Box>
  );
};

export { Chatbox };
