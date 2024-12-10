const { Op } = require("sequelize");
const { Message } = require("../models/Message");
const { User } = require("../models/User");

const savemsg = async (data) => {
  try {
    console.log("req----------?", data);
    const messageData = {
      message: data?.message,
      sender: data.sender.id,
      receiver: data.receiver.id,
    };

    const newMessage = await Message.create(messageData);
    return newMessage.dataValues;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

const getPastMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    console.log("-----------------------", req.body);
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      },

      order: [["sentAt", "ASC"]],
      include: [
        {
          model: User,
          as: "senderUser",
          attributes: ["id", "firstname", "lastname", "email"],
        },
        {
          model: User,
          as: "receiverUser",
          attributes: ["id", "firstname", "lastname", "email"],
        },
      ],
    });

    const formattedMessages = messages.map((message) => ({
      id: message.id,
      message: message.message,
      sentAt: message.sentAt,
      sender: message.senderUser.dataValues,
      receiver: message.receiverUser.dataValues,
    }));
    // console.log("Fetched Messages:", formattedMessages);

    return res.json(formattedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

module.exports = { savemsg, getPastMessages };
