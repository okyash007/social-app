import Chat from "../modles/chatModel.js";
import User from "../modles/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const acessChat = asyncHandler(async (req, res, next) => {
  const { uid, fromid } = req.body;

  if (!uid) {
    return next(new apiError(400, "no uid is provided"));
  }

  if (req.user.id != uid) {
    return next(new apiError(400, "you are not authorized"));
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: uid } } },
      { users: { $elemMatch: { $eq: fromid } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "username",
  });

  if (isChat.length > 0) {
    res.send(new apiResponse(200, isChat[0]));
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [uid, fromid],
    };

    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.send(new apiResponse(200, fullChat));
  }
});

export const fetchChats = asyncHandler(async (req, res, next) => {
  if (req.params.id != req.user.id) {
    return next(new apiError(400, "you are bot authorized"));
  }

  //   return res.json(new apiResponse(200, {data: "here will be the data"}))
  await Chat.find({ users: { $elemMatch: { $eq: req.params.id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      res.status(200).send(new apiResponse(200, results));
    });
});
