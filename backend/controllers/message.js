const { Op } = require("sequelize");
const { Message } = require("../models/Message");
const { User } = require("../models/User");
const { ReadReceipt } = require("../models/Readmessage");
const savemsg = async (data) => {
  try {
    // console.log("req----------?", data);
    const messageData = {
      image: data?.image || "",
      message: data?.message,
      sender: data.sender.id,
      receiver: data.receiver.id,
    };

    const newMessage = await Message.create(messageData);

    const postmessage = await ReadReceipt.create({
      messageId: newMessage.id,
      senderId: newMessage.sender,
      userId: newMessage.receiver,
    });

    // console.log("Message Insertted Successfully", newMessage);

    return newMessage.dataValues;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

const getPastMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

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
      image: message.image,
      sentAt: message.sentAt,
      sender: message.senderUser.dataValues,
      receiver: message.receiverUser.dataValues,
      isRead: message.isRead,
    }));
    // console.log("Fetched Messages:", formattedMessages);

    return res.json(formattedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

module.exports = { savemsg, getPastMessages };
