const { Message } = require("../models/Message");
const { ReadReceipt } = require("../models/Readmessage");

const getMessages = async (req, res) => {
  try {
    const response = await ReadReceipt.findAll({});

    res.status(200).json({ message: response, success: true });
  } catch (error) {
    res.status(400).json({ message: error, success: false });
  }
};

const updateReadMessage = async (req, res) => {
  try {
    const { isRead, messageId } = req.body;

    if (!messageId) {
      return res.status(400).json({ error: "Message ID is required" });
    }

    const updatedMessage = await ReadReceipt.update(
      { isRead: isRead },
      { where: { messageId: messageId } }
    );

    const updateReffrence = await Message.update(
      { isRead: isRead },
      { where: { id: messageId } }
    );

    return res.status(200).json({
      message: "Message read status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getMessages, updateReadMessage };
