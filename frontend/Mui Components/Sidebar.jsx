import React, { useState } from "react";
import { Header } from "./Header";
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
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Sidebar = ({ button }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "20vw",
      }}
    >
      <Header />

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
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <React.Fragment key={index}>
                <ListItem
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
                    primary="John Doe"
                    secondary={
                      <Typography variant="caption">Ali Connors</Typography>
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
