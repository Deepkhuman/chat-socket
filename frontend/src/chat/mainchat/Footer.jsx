import { Box, InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useState } from "react";

const Footer = ({ handleSendmsg }) => {
	const [msg, Setmsg] = useState();

	const handleChange = (e) => {
		Setmsg(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		handleSendmsg(msg);
		e.target.reset();
	};
	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
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
				onChange={handleChange}
			></TextField>
			<InputAdornment position="end">
				<IconButton type="submit">
					<SendRoundedIcon />
				</IconButton>
			</InputAdornment>
		</Box>
	);
};

export default Footer;
