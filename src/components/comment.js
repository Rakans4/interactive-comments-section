import React from "react";
import IconPlus from "../assets/icon-plus.svg";
import IconMinus from "../assets/icon-minus.svg";
import IconReply from "../assets/icon-reply.svg";

const Comment = ({ comment }) => {
  return (
    <div className="flex bg-white w-72">
      <div className="border-2 border-red-200">
        <img src={IconPlus} alt="plus score" />
        <div>{comment.score}</div>
        <img src={IconMinus} alt="minus score" />
      </div>
      <div className="border-2 border-blue-200">
        <div className="flex">
          <img
            src={require("../assets/avatars/image-amyrobson.png")}
            alt="avatar"
          />
          <div>{comment.username}</div>
          <div>{comment.createdAt}</div>
          <div>
            <img src={IconReply} alt="reply"/> <span>Reply</span>
          </div>
        </div>
        <div className="text-GrayishBlue">{comment.content}</div>
      </div>
      <div>
        {comment.replies &&
          comment.replies.map((reply) => <div>{reply.content}</div>)}
      </div>
    </div>
  );
};

export default Comment;
