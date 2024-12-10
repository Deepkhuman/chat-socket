import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Popper,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useState } from "react";

const Header = ({ button }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <Card
      sx={{
        bgcolor: "primary.light",
        borderRadius: 0,
        color: "primary.contrastText",
      }}
    >
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        action={
          <IconButton
            aria-label="settings"
            sx={{ color: "primary.contrastText" }}
            aria-describedby={id}
            type="button"
            onClick={handleClick}
          >
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                {button}
              </Box>
            </Popper>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" sx={{ fontSize: "1.3rem" }}>
            {" "}
            {localStorage.getItem("loggedinUSer")}
          </Typography>
        }
        subheader={
          <Typography variant="caption">UI Frontend Developer</Typography>
        }
      />
    </Card>
  );
};

export { Header };
