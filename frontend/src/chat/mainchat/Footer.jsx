import { Box, InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useRef, useState } from "react";

const Footer = ({ handleSendmsg }) => {
	const [msg, Setmsg] = useState();
	const [image, setImage] = useState({});

	const fileInputRef = useRef(null);

	const handleChange = (e) => {
		Setmsg(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (image) {
			handleSendmsg(msg, image);
		} else {
			handleSendmsg(msg);
		}
		Setmsg("");
		setImage(null);
		e.target.reset();
	};

	const handleFileSelect = async (e) => {
		const file = e.target.files[0];
		if (file) {
			console.log("Selected file:", file);
			setImage(file);
		}
	};

	const handleIconButtonClick = () => {
		if (fileInputRef.current) fileInputRef.current.click();
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
			<IconButton sx={{ marginRight: 2 }} onClick={handleIconButtonClick}>
				<AttachFileRoundedIcon />
			</IconButton>

			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileSelect}
			/>

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
