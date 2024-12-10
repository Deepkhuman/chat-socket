import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const Header = ({ roomData }) => {
  console.log(roomData);
  return (
    <Card
      sx={{
        borderRadius: 0,
      }}
    >
      <CardHeader
        sx={{ bgcolor: "#016b61" }}
        avatar={
          <Button sx={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIcon sx={{ marginRight: 1, color: "white" }} />{" "}
            <Avatar>R</Avatar>
          </Button>
        }
        action={
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <IconButton sx={{ padding: 0, marginRight: 2, color: "white" }}>
              <VideocamIcon />
            </IconButton>
            <IconButton sx={{ padding: 0, color: "white" }}>
              <CallIcon />
            </IconButton>
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontSize: "1rem", color: "white" }}>
            <span>{roomData.receiver.firstname}</span>
          </Typography>
        }
        subheader={
          <Typography sx={{ color: "white" }} variant="caption">
            {roomData.receiver.email}
          </Typography>
        }
      />
    </Card>
  );
};

export default Header;
