import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import React, { useEffect, useState } from "react";
import { Header } from "./Header";

const Sidebar = ({ button, user, onlineusers, SetroomData, roomData }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("RoomData ===============------->", roomData);


  const handleChatRoom = (user) => {
    SetroomData((prevRoomData) => ({
      ...prevRoomData,
      room: prevRoomData?.receiver?.id || null,
      receiver: user,
    }));
  };

  useEffect(() => {
    if (user) {
      handleChatRoom(user);
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "20vw",
      }}
    >
      <Header button={button} />

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
        sx={{
          paddingBottom: "16px",
        }}
      >
        <Tab
          label="Chat List"
          icon={<ChatBubbleOutlineIcon />}
          iconPosition="start"
        />
        <Tab label="User List" icon={<PersonIcon />} iconPosition="start" />
      </Tabs>

      {value === 0 && (
        <List
          sx={{
            pt: 0,
            overflowY: "auto",
            flexGrow: 1,
            maxHeight: "calc(100vh - 200px)",
            scrollbarWidth: "thin",
          }}
        >
          {onlineusers
            .filter((item) => item?.id !== user?.id)
            .map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  onClick={() => handleChatRoom(item)}
                  alignItems="flex-start"
                  sx={{
                    minHeight: 100,
                    padding: "16px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.firstname}
                    secondary={
                      <Typography variant="caption">{item.email}</Typography>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
        </List>
      )}

      {value === 1 && (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">User List</Typography>
          <div>Content for User List goes here</div>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
