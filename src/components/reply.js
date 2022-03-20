import React, { useState } from "react";
import IconPlus from "../assets/icon-plus.svg";
import IconMinus from "../assets/icon-minus.svg";
import IconReply from "../assets/icon-reply.svg";
import IconEdit from "../assets/icon-edit.svg";
import IconDelete from "../assets/icon-delete.svg";

import { initialComments, currentUser, commentsReducer } from "../state";

const Reply = (props) => {
  const [isReplying, setIsReplying] = useState(false);
  const reply = props.reply;
  const isLoggedUser = reply.user.username === currentUser.username;
  function toggleReply() {
    setIsReplying(!isReplying);
  }
  function upvote(){
    props.upvote(reply.id);
  }
  function downvote(){
    props.downvote(reply.id);
  }
  function deleteReply(){
    props.deleteReply(reply.id);

  }
  return (
    <div className="w-full  ml-[10%] border-l-2 border-l-LightGray">
      <div className="flex bg-white w-[90%] rounded-lg p-6 my-3 ml-[5%]">
      <div className="bg-VeryLightGray w-[5%] h-24 flex flex-col  rounded-lg text-ModerateBlue">
          <div
            onClick={upvote}
            className="w-full h-1/3 flex items-center justify-center cursor-pointer"
          >
            <img className="w-max h-max" src={IconPlus} alt="plus score" />
          </div>
          <div className="font-medium w-full h-1/3 flex items-center justify-center">
            {reply.score}
          </div>
          <div
            onClick={downvote}
            className="w-full h-1/3 flex items-center justify-center cursor-pointer"
          >
            <img className="w-max h-max" src={IconMinus} alt="minus score" />
          </div>
        </div>
        <div className="ml-6 w-[90%]">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <img
                className="w-9 h-9"
                src={require("../assets/avatars/image-amyrobson.png")}
                alt="avatar"
              />
              <div className="ml-6 font-medium">{reply.user.username}</div>
              <div className="ml-6 text-GrayishBlue">{reply.createdAt}</div>
            </div>
            <div className="flex">
              {isLoggedUser ? (
                <>
                  <div
                    onClick={deleteReply}
                    className="flex items-center text-SoftRed font-medium cursor-pointer"
                  >
                    <img className="h-max w-max" src={IconDelete} alt="reply" />
                    <span className="ml-2">Delete</span>
                  </div>
                  <div className="flex items-center text-ModerateBlue font-medium ml-6 cursor-pointer">
                    <img className="h-max w-max" src={IconEdit} alt="reply" />
                    <span className="ml-2">Edit</span>
                  </div>
                </>
              ) : (
                <div
                  onClick={toggleReply}
                  className="flex items-center text-ModerateBlue font-medium cursor-pointer"
                >
                  <img className="h-max w-max" src={IconReply} alt="reply" />
                  <span className="ml-2">Reply</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-GrayishBlue mt-4 break-all">{reply.content}</div>
        </div>
      </div>
      {isReplying && (
        <div className="flex bg-white w-[90%] rounded-lg p-6 my-3 ml-[5%]">
          <div className="w-full flex bg-white rounded-lg mt-1">
            <img
              className="w-9 h-9"
              src={require("../assets/avatars/image-amyrobson.png")}
              alt="logged in user avatar"
            />
            <form
              // onSubmit={addReply}
              className="w-full flex items-start justify-between ml-3"
            >
              <textarea
                type="text"
                placeholder="Add a comment..."
                className="border-[0.5px] border-LightGray rounded-lg text-base break-all py-2 px-3 font-normal w-[83%]"
              />
              <input
                className="h-10 w-20 bg-ModerateBlue text-white rounded-lg text-sm"
                type="submit"
                value="REPLY"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reply;
