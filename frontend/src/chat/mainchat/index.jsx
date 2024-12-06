import { Box } from "@mui/material";
import React from "react";
import Header from "./Header";
import Chatarea from "./Chatarea";
import Footer from "./Footer";

const Chatbox = () => {
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
      <Header />
      <Chatarea />
      <Footer />
    </Box>
  );
};

export { Chatbox };
