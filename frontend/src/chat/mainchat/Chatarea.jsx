import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import axiosClient from "../../Axios/axiosClient";

const Chatarea = ({ messages, user, roomData }) => {
  const [getMsg, setMsg] = useState([]);
  console.log("Current Messages:", messages);

  const getLatestMessage = () => {
    if (roomData.room) {
      const response = axiosClient.get("/getmessage");
      response.then((res) => {
        setMsg((prev) => [...prev, res.message]);
      });
    }
  }
  useEffect(() => {
    const updatedMessages = getMsg.map((roomMessages) =>
      roomMessages.map((message) => {
        if (message.userId === user.id && !message.isRead) {
          message.isRead = true;

          axiosClient
            .post("/updateReadMessage", {
              messageId: message.messageId,
              isRead: true,
            })
            .then((response) => {
              getLatestMessage()
              console.log("Message read status updated successfully", response);
            })
            .catch((error) => {
              console.error("Error updating read status", error);
            });
        }
        return message;
      })
    );
  }, [getMsg]);

  useEffect(() => {
    getLatestMessage()
  }, [messages]);

  return (
    <Box
      sx={{
        overflowY: "auto",
        flex: " 1 0 0",
        backgroundColor: "#eee",
        width: "100%",
      }}
    >
      <List
        sx={{
          pt: 0,
          overflowY: "auto",
          scrollbarWidth: "thin",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "8px",
        }}
      >
        {messages.map((item, index) => {

          if (!item?.sender?.id) return null;
          const imageUrl = item?.image ? `http://localhost:3000/${item?.image}` : null;

          return item.sender.id === user?.id ? (
            <ListItem
              sx={{
                width: "fit-content",
                display: "flex",
                flexDirection: "row-reverse",
                ml: "auto",
              }}
              key={index}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  p: 1,
                  width: "auto",
                  backgroundColor: "#fff",
                  borderRadius: "3px",
                  mr: "5px",
                  textAlign: "right",
                  bgcolor: "#e2ffc7",
                }}
                key={item.id}
                // primary={
                //   <Typography
                //     sx={{ color: "#000000", backgroundColor: "GrayText", fontSize: "1rem" }}
                //     align="right"
                //   >
                //     {"Me"}
                //   </Typography>
                // }
                secondary={

                  <>
                    {imageUrl && (
                      <img src={imageUrl} alt="Imagedata" />
                    )}
                    <Typography
                      sx={{ color: "#000000" }}
                      variant="caption"
                      align="right"
                    >

                      {item.message}{" "}
                      <DoneAllIcon
                        sx={{
                          ml: "2px",
                          color: item.isRead == 1 ? "blue" : "black",
                          fontSize: "1.6rem",
                          mb: "4px",
                          p: "4px",
                        }}
                      />
                    </Typography>
                  </>

                }
              />
            </ListItem>
          ) : (
            <ListItem sx={{ width: "fit-content" }} key={index}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  p: 1,
                  width: "auto",
                  backgroundColor: "#fff",
                  borderRadius: "3px",
                  ml: "5px",
                }}
                primary={item.sender.firstname}
                secondary={
                  <>
                    {imageUrl && (
                      <img src={imageUrl} alt="Imagedata" />
                    )}

                    <Typography
                      variant="caption"
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      {item.message}
                      <Typography
                        sx={{
                          pl: "10px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                        }}
                      >
                        {/* {time} */}
                      </Typography>
                    </Typography>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Chatarea;
