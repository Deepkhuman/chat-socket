import { Box, InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import IconButton from "@mui/material/IconButton";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <IconButton sx={{ marginRight: 2 }}>
        <AttachFileRoundedIcon />
      </IconButton>

      <TextField
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: 1,
        }}
        placeholder="Type a message"
        variant="outlined"
        size="small"
      ></TextField>
      <InputAdornment position="end">
        <IconButton>
          <SendRoundedIcon />
        </IconButton>
      </InputAdornment>
    </Box>
  );
};

export default Footer;
