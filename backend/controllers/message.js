const Message = require("../models/Message");

const savemsg = async (data) => {
	try {
		const newMessage = await Message.create(data);
		return newMessage;
	} catch (error) {
		console.error("Error saving message:", error);
		throw error;
	}
};

module.exports = savemsg;
