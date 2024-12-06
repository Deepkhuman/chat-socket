import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Chatarea = () => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        flex: " 1 0 0",
        backgroundColor: "#eee",
      }}
    >
      <List
        sx={{
          pt: 0,
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
        <ListItem sx={{ width: "50%" }}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            sx={{
              p: 1,
              width: "30px",
              backgroundColor: "#fff",
              borderRadius: "3px",
              ml: "5px",
            }}
            primary="John Doe"
            secondary={<Typography variant="caption">Ali Connors</Typography>}
          />
        </ListItem>
      </List>

      <List
        sx={{
          pt: 1,
          overflowY: "auto",
          scrollbarWidth: "thin",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ListItem
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
          }}
        >
          <ListItemAvatar sx={{ ml: "10px" }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            sx={{
              p: 1,
              width: "auto",
              ml: "3px",
              backgroundColor: "#fff",
              borderRadius: "3px",
              justifyContent: "flex-end",
            }}
            primary="John Doe"
            secondary={<Typography variant="caption">Ali Connors</Typography>}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Chatarea;
