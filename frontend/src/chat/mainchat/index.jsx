import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chatarea from "./Chatarea";
import Footer from "./Footer";
import Header from "./Header";

const Chatbox = ({ roomData, handleSendmsg, messages, user }) => {
	const [room, Setroom] = useState();
	useEffect(() => {
		Setroom(roomData.room);
	}, [roomData.room]);
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
			{room ? (
				<>
					<Header roomData={roomData} />
					<Chatarea user={user} messages={messages} />
					<Footer handleSendmsg={handleSendmsg} />
				</>
			) : (
				<>Please Select Among Users to Chat with Them</>
			)}
		</Box>
	);
};

export { Chatbox };
