import React, { useState } from "react";
import IconPlus from "../assets/icon-plus.svg";
import IconMinus from "../assets/icon-minus.svg";
import IconReply from "../assets/icon-reply.svg";

const Comment = ({ comment }) => {
  return (
    <div className="flex ">
      <div className="border-2 border-red-200">
        <img src={IconPlus} />
        <div>{comment.score}</div>
        <img src={IconMinus} />
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
            <img src={IconReply} /> <span>Reply</span>
          </div>
        </div>
        <div>{comment.content}</div>
      </div>
      <div>
        {comment.replies &&
          comment.replies.map((reply) => <div>{reply.content}</div>)}
      </div>
    </div>
  );
};

export default Comment;
