import React from "react";
import IconPlus from "../assets/icon-plus.svg";
import IconMinus from "../assets/icon-minus.svg";
import IconReply from "../assets/icon-reply.svg";
import IconEdit from "../assets/icon-edit.svg";
import IconDelete from "../assets/icon-delete.svg";
import Reply from "./reply";

import { initialComments, currentUser, commentsReducer } from "../state";

const Comment = (props) => {
  const comment = props.comment;
  console.log(props.delete);
  function deleteComment() {
    props.delete(comment.id);
  }
  return (
    <div className="w-[44rem]">
      <div className="flex bg-white w-full rounded-lg p-6 my-3">
        <div className="bg-VeryLightGray w-[5%] h-24 flex flex-col justify-between items-center py-4 rounded-lg text-ModerateBlue">
          <img className="w-max h-max" src={IconPlus} alt="plus score" />
          <div className="font-medium">{comment.score}</div>
          <img className="w-max h-max" src={IconMinus} alt="minus score" />
        </div>
        <div className="ml-6 w-[90%]">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <img
                className="w-9 h-9"
                src={require("../assets/avatars/image-amyrobson.png")}
                // src={require(`.${comment.user.image.png}`)}
                alt="avatar"
              />
              <div className="ml-6 font-medium">{comment.user.username}</div>
              <div className="ml-6 text-GrayishBlue">{comment.createdAt}</div>
            </div>
            <div className="flex">
            {comment.user.username === currentUser.username ? (
              <>
              <div
                  onClick={deleteComment}
                  className="flex items-center text-SoftRed font-medium"
                >
                  <img className="h-max w-max" src={IconDelete} alt="reply" />
                  <span className="ml-2">Delete</span>
                </div>
                <div className="flex items-center text-ModerateBlue font-medium ml-6">
                  <img className="h-max w-max" src={IconEdit} alt="reply" />
                  <span className="ml-2">Edit</span>
                </div>
                
              </>
            ) : (
              <div className="flex items-center text-ModerateBlue font-medium">
                <img className="h-max w-max" src={IconReply} alt="reply" />
                <span className="ml-2">Reply</span>
              </div>
            )}
            </div>
          </div>
          <div className="text-GrayishBlue mt-4 break-all">
            {comment.content}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        {comment.replies &&
          comment.replies.map((reply) => <Reply reply={reply} />)}
      </div>
    </div>
  );
};

export default Comment;
