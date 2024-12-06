import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import React from "react";

const Header = () => {
  return (
    <Card
      sx={{
        borderRadius: 0,
      }}
    >
      <CardHeader
        avatar={
          <Button sx={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIcon sx={{ marginRight: 1 }} /> <Avatar>R</Avatar>
          </Button>
        }
        action={
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <IconButton sx={{ padding: 0, marginRight: 2 }}>
              <VideocamIcon />
            </IconButton>
            <IconButton sx={{ padding: 0 }}>
              <CallIcon />
            </IconButton>
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            <span>Harsh Ahir</span>
          </Typography>
        }
        subheader={
          <Typography variant="caption">Software Developer</Typography>
        }
      />
    </Card>
  );
};

export default Header;
