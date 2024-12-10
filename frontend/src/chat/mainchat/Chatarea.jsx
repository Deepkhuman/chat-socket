import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import axiosClient from "../../Axios/axiosClient";

const Chatarea = ({ messages, user, SetAllmsg, roomData }) => {
  console.log("Current Messages:", messages);

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
          padding: "5px",
        }}
      >
        {messages.map((item, index) => {
          if (!item?.sender?.id) return null;

          return item.sender.id === user?.id ? (
            <ListItem
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "row-reverse",
                ml: "50%",
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
                  bgcolor: "#6495ED",
                }}
                key={item.id}
                primary="Me"
                secondary={
                  <Typography variant="caption" align="right">
                    {item.message}
                  </Typography>
                }
              />
            </ListItem>
          ) : (
            <ListItem sx={{ width: "50%" }} key={index}>
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
                  <Typography variant="caption"> {item.message}</Typography>
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
