import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

const Header = () => {
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
          >
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
