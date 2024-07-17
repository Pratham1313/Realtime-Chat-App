import Conversation from "../model/conversation.js";
import Message from "../model/message.js";

export async function sendMessage(req, res) {
  try {
    const { recieverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    console.log(senderId, recieverId, message);

    let conversation = await Conversation.findOne({
      participant: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participant: [senderId, recieverId],
      });
    }
    console.log(conversation);

    const newMessage = Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save();
    await newMessage.save();
    console.log("saved");
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("sendMessage route - error - >", error);
    res.status(500).json({ error: "internal server error" });
  }
}

export const getMessage = async (req, res) => {
  try {
    const { recieverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participant: { $all: [senderId, recieverId] },
    })
      .populate("messages")
      .sort({ createdAt: -1 });
    console.log(conversation);
    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
