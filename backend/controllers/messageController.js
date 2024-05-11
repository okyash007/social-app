import Chat from "../modles/chatModel.js";
import { Message } from "../modles/messageModel.js";
import User from "../modles/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { senderId, reciverId, chatId, content } = req.body;

  if (senderId != req.user.id) {
    return next(new apiError(400, "you are not authorized"));
  }

  const chat = await Chat.findById(chatId);

  if (!chat.users.includes(senderId)) {
    return next(new apiError(400, "You cant send message to others chats"));
  }

  let newMessage = new Message({
    sender: senderId,
    content: content,
    chat: chatId,
  });

  var message = await Message.create(newMessage);
  message = await message.populate("sender");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "fullname username avatar",
  });

  await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

  res.json(new apiResponse(200, message));
});

export const allMessages = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);

  if (!chat.users.includes(req.user.id)) {
    return next(new apiError(400, "you cannot get oths chats"));
  }

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name pic email")
    .populate("chat");

  res.json(new apiResponse(200, messages));
});
