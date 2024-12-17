import { Box, InputAdornment, TextField, IconButton, Typography } from "@mui/material";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useEffect, useRef, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

const Footer = ({ handleSendmsg, socketRef, user, isTyping, roomData, setIsTyping, setTypingUserId }) => {
	const [msg, Setmsg] = useState("");
	const [image, setImage] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const fileInputRef = useRef(null);

	// console.log("user", user)
	// console.log("Socketref", socketRef)

	const handleChange = (e) => {
		Setmsg(e.target.value);
		setIsTyping(true)
	};


	useEffect(() => {
		let typingTimeout;

		if (msg.length > 0) {
			setIsTyping(true);
			socketRef.current.emit("TYPING", { roomId: 1, receiver: roomData.receiver, user: user.id, typing: true });
		} else {
			setIsTyping(false);
			console.log("running")
			socketRef.current.emit("TYPING", { roomId: 1, receiver: roomData.receiver, user: user.id, typing: false });
		}

		if (msg.length > 0) {
			typingTimeout = setTimeout(() => {
				setIsTyping(false);
				socketRef.current.emit("TYPING", { roomId: 1, receiver: roomData.receiver, user: user.id, typing: false });
			}, 2000);
		}

		return () => {
			clearTimeout(typingTimeout);
		};
	}, [msg]);


	useEffect(() => {

		socketRef.current.on("TYPING", (data) => {

			console.log("Typing status received:", data);

			if (data.typing) {
				setTypingUserId(data.user);
				setIsTyping(true);
			} else if (data.user === user.id) {
				if (!msg.length) {
					setTypingUserId(null);
					setIsTyping(false);
				}
			} else {
				setTypingUserId(null);
				setIsTyping(false);
			}
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.off("TYPING");
			}
		};
	}, [socketRef, user.id, msg]);


	const handleSubmit = (e) => {
		e.preventDefault();
		if (image) {
			handleSendmsg(msg, image);
		} else {
			handleSendmsg(msg);
		}
		Setmsg("");
		setImage(null);
		setSelectedImage(null);
		e.target.reset();
	};

	const handleFileSelect = async (e) => {
		const file = e.target.files[0];
		if (file) {
			console.log("Selected file:", file);
			setImage(file);
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};

	const handleIconButtonClick = () => {
		if (fileInputRef.current) fileInputRef.current.click();
	};

	const handleCancleimage = () => {
		setSelectedImage(null)
		setImage(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const renderImagePreview = () => {
		if (selectedImage) {
			return (
				<div style={{ display: "flex", justifyContent: "flex-start", backgroundColor: "#eee" }}>
					<Box sx={{ ml: "5px", backgroundColor: "white", display: "flex", borderRadius: "12px", p: "10px", Height: "20%", width: "20%" }}>
						<img
							src={selectedImage}
							alt="Image preview"
							style={{
								Width: "10%",
								Height: "10%",
							}}
						/>
						<Box sx={{ mt: "10px", pl: "10px", color: "red", display: "flex", justifyContent: "center", cursor: "pointer" }}>
							<Typography variant="caption">
								<ClearIcon onClick={handleCancleimage} />
							</Typography>
						</Box>
					</Box>

				</div >
			);
		}
	};

	return (
		<>
			<Box sx={{ width: "100%", overflow: "hidden", backgroundColor: "transparent" }}>
				{renderImagePreview()}
			</Box>
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
				}
				}
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
					value={msg}
					onChange={handleChange}
				/>

				<InputAdornment position="end">
					<IconButton type="submit">
						<SendRoundedIcon />
					</IconButton>
				</InputAdornment>

			</Box >
		</>
	);
};

export default Footer;
