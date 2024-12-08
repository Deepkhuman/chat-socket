import { Button, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "../../Mui Components/Sidebar";
import { handleError } from "../../utils";
import axiosClient from "../Axios/axiosClient";
import { Chatbox } from "../chat/mainchat";

const PATH = "http://localhost:3000";

const Home = () => {
	const [loggedinuser, setloggedinUser] = useState("");
	const navigate = useNavigate();
	const [Isconnected, SetIsconnected] = useState(false);
	const [roomData, SetroomData] = useState({
		room: null,
		receiver: null,
	});
	const [allmsg, SetAllmsg] = useState([]);
	const socketRef = useRef(null);
	const [onlineusers, Setonlineusers] = useState([]);
	const location = useLocation();
	const userDetails = location.state?.userData;

	useEffect(() => {
		socketRef.current = io.connect(PATH, {
			withCredentials: true,
			transports: ["websocket"],
		});

		socketRef.current.on("connect", () => {
			SetIsconnected(true);
			console.log("Socket connected with ID: ", socketRef.current.id);
			if (userDetails) {
				socketRef.current.emit("ADD_USER", userDetails);
				socketRef.current.on("USER_ADDED", (data) => {
					Setonlineusers(data);
				});
				socketRef.current.on("RECEIVE_MSG", (data) => {
					console.log(data);
					SetAllmsg((prev) => [...prev, data]);
				});
			}
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				console.log("Socket disconnected on component unmount");
			}
		};
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const user = localStorage.getItem("loggedinUSer");

		if (!token) {
			navigate("/login");
			handleError("You must be logged in to access this page");
		} else {
			setloggedinUser(user);
			verifyToken(token);
		}
	}, [navigate]);

	async function verifyToken(token) {
		try {
			const response = await axiosClient.get("/", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			handleError("Invalid session. Please log in again.");
			localStorage.removeItem("token");
			localStorage.removeItem("loggedinUSer");
			navigate("/login");
		}
	}

	async function handlelogout() {
		try {
			if (socketRef.current) {
				socketRef.current.emit("LOGOUT");
				socketRef.current.disconnect();
				SetIsconnected(false);
				console.log("Socket disconnected");
			}

			localStorage.removeItem("token");
			localStorage.removeItem("loggedinUSer");

			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	}

	const handleSendmsg = (msg) => {
		if (socketRef.current.connected) {
			const data = {
				msg,
				receiver: roomData.receiver,
				sender: userDetails,
			};
			socketRef.current.emit("SEND_MSG", data);
			SetAllmsg((prev) => [...prev, data]);
		}
	};

	return (
		<>
			<Paper
				square
				elevation={0}
				sx={{ width: "100vw", display: "flex", height: "100vh" }}
			>
				<Button onClick={() => handlelogout()}>cick</Button>
				<Sidebar
					user={userDetails}
					onlineusers={onlineusers}
					roomData={roomData}
					SetroomData={SetroomData}
				/>
				<Chatbox
					handleSendmsg={handleSendmsg}
					messages={allmsg}
					user={userDetails}
					roomData={roomData}
				/>
			</Paper>
		</>
	);
};

export default Home;
