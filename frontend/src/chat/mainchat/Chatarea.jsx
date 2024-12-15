import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../Axios/axiosClient";

// Helper function to render images and handle files (like PDFs)
const renderMedia = (filePath) => {
	if (filePath.startsWith("data:image")) {
		return <img src={filePath} height="150px" width="80px" alt="Message" />;
	} else if (filePath.endsWith(".pdf")) {
		return (
			<Typography>
				<a
					href={`http://localhost:3000/${filePath}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					Open PDF
				</a>
			</Typography>
		);
	} else {
		return (
			<img
				src={`http://localhost:3000/${filePath}`}
				height="150px"
				width="80px"
				alt="Message"
			/>
		);
	}
};

const Chatarea = ({ messages, user, roomData }) => {
	const [getMsg, setMsg] = useState([]);
	const messageEndRef = useRef(null); // Ref for scroll position

	// Scroll to the bottom when new messages are added
	useEffect(() => {
		if (messageEndRef.current) {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]); // Trigger scroll when messages change

	const getLatestMessage = () => {
		if (roomData.room) {
			const response = axiosClient.get("/getmessage");
			response.then((res) => {
				setMsg((prev) => [...prev, res.message]);
			});
		}
	};
	useEffect(() => {
		const updatedMessages = getMsg.map((roomMessages) =>
			roomMessages.map((message) => {
				if (message.userId === user.id && !message.isRead) {
					message.isRead = true;

					axiosClient
						.post("/updateReadMessage", {
							messageId: message.messageId,
							isRead: true,
						})
						.then((response) => {
							getLatestMessage();
							console.log("Message read status updated successfully", response);
						})
						.catch((error) => {
							console.error("Error updating read status", error);
						});
				}
				return message;
			})
		);
	}, [getMsg]);

	useEffect(() => {
		getLatestMessage();
	}, [messages]);

	return (
		<Box
			sx={{
				overflowY: "auto",
				flex: "1 0 0",
				backgroundColor: "#eee",
				width: "100%",
			}}
		>
			<List
				sx={{
					pt: 0,
					overflowY: "auto",
					scrollbarWidth: "thin",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					padding: "8px",
				}}
			>
				{messages.map((item, index) => {
					if (!item?.sender?.id) return null;
					return item.sender.id === user?.id ? (
						<ListItem
							sx={{
								width: "fit-content",
								display: "flex",
								flexDirection: "row-reverse",
								ml: "auto",
							}}
							key={index}
						>
							<ListItemAvatar>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
							</ListItemAvatar>
							<ListItemText
								sx={{
									p: 1,
									width: "auto",
									backgroundColor: "#fff",
									borderRadius: "3px",
									mr: "5px",
									textAlign: "right",
									bgcolor: "#e2ffc7",
								}}
								secondary={
									<>
										{item.image && renderMedia(item.image)}{" "}
										{/* Use the helper function here */}
										<Typography
											sx={{ color: "#000000" }}
											variant="caption"
											align="right"
										>
											{item.message}{" "}
											<DoneAllIcon
												sx={{
													ml: "2px",
													color: item.isRead == 1 ? "blue" : "black",
													fontSize: "1.6rem",
													mb: "4px",
													p: "4px",
												}}
											/>
										</Typography>
									</>
								}
							/>
						</ListItem>
					) : (
						<ListItem sx={{ width: "fit-content" }} key={index}>
							<ListItemAvatar>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
							</ListItemAvatar>
							<ListItemText
								sx={{
									p: 1,
									width: "auto",
									backgroundColor: "#fff",
									borderRadius: "3px",
									ml: "5px",
								}}
								primary={item.sender.firstname}
								secondary={
									<>
										{item.image && renderMedia(item.image)}{" "}
										{/* Use the helper function here */}
										<Typography
											variant="caption"
											sx={{ display: "flex", flexDirection: "row" }}
										>
											{item.message}
										</Typography>
									</>
								}
							/>
						</ListItem>
					);
				})}
				{/* Add a "ref" to the bottom of the list to trigger scroll */}
				<div ref={messageEndRef} />
			</List>
		</Box>
	);
};

export default Chatarea;
