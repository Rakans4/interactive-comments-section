import React, { useState } from "react";
import IconPlus from "../assets/icon-plus.svg";
import IconMinus from "../assets/icon-minus.svg";
import IconReply from "../assets/icon-reply.svg";
import IconEdit from "../assets/icon-edit.svg";
import IconDelete from "../assets/icon-delete.svg";
import Reply from "./reply";
import { v4 as uuid } from "uuid";

import { initialComments, currentUser, commentsReducer } from "../state";

const Comment = (props) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const comment = props.comment;
  const isLoggedUser = comment.user.username === currentUser.username;

  const [commentContent, setCommentContent] = useState("");

  function handleInput(e) {
    setCommentContent(e.target.value);
  }

  function deleteComment() {
    props.delete(comment.id);
  }

  function deleteReply(replyId) {
    let repliesCopy = comment.replies.filter((reply) => {
      if (replyId === reply.id) return;
      return reply;
    });

    props.updateComment({
      ...comment,
      replies: repliesCopy,
    });
  }

  function editReply(editedReply) {
    let repliesCopy = comment.replies.map((reply) => {
      if (editedReply.id === reply.id) return editedReply;
      return reply;
    });

    props.updateComment({
      ...comment,
      replies: repliesCopy,
    });
  }

  function upvote(id) {
    if (id) {
      const replies = comment.replies.map((reply) => {
        if (id === reply.id) {
          return { ...reply, score: reply.score + 1 };
        }
        return reply;
      });
      props.upvote({ ...comment, replies: replies }, true);
    } else {
      props.upvote(comment, false);
    }
  }

  function downvote(id) {
    if (id) {
      const replies = comment.replies.map((reply) => {
        if (id === reply.id) {
          return { ...reply, score: reply.score - 1 };
        }
        return reply;
      });
      props.upvote({ ...comment, replies: replies }, true);
    } else {
      props.downvote(comment);
    }
  }

  function toggleReply() {
    setIsReplying(!isReplying);
  }

  function openEditComment() {
    setCommentContent(comment.content);
    setIsEditing(!isEditing);
  }

  function editComment(e) {
    e.preventDefault();
    props.updateComment({ ...comment, content: commentContent });
    setIsEditing(!isEditing);
  }

  function addReply(e, replyingToUser) {
    e.preventDefault();
    const id = uuid(),
      content = e.target.firstChild.value,
      createdAt = new Date().toDateString(),
      score = 0,
      replyingTo = replyingToUser || comment.user.username,
      user = currentUser;
    const newReply = {
      id: id,
      content: content,
      createdAt: createdAt,
      score: score,
      replyingTo: replyingTo,
      user: user,
    };

    console.log(newReply);

    props.updateComment({
      ...comment,
      replies: [...comment.replies, newReply],
    });

    setCommentContent("");
    if(isReplying)toggleReply();
  }

  return (
    <div className="w-[44rem]">
      <div className="flex bg-white w-full rounded-lg p-6 my-3">
        <div className="bg-VeryLightGray w-[5%] h-24 flex flex-col  rounded-lg text-ModerateBlue">
          <div
            onClick={upvote}
            className="w-full h-1/3 flex items-center justify-center cursor-pointer"
          >
            <img className="w-max h-max" src={IconPlus} alt="plus score" />
          </div>
          <div className="font-medium w-full h-1/3 flex items-center justify-center">
            {comment.score}
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
                // src={require(`.${comment.user.image.png}`)}
                alt="avatar"
              />
              <div className="ml-6 font-medium">
                {comment.user.username}
                {isLoggedUser && (
                  <span className="bg-ModerateBlue rounded-sm text-white text-xs px-[0.3rem] py-[0.1rem]">
                    you
                  </span>
                )}
              </div>
              <div className="ml-6 text-GrayishBlue">{comment.createdAt}</div>
            </div>
            <div className="flex">
              {isLoggedUser ? (
                <>
                  <div
                    onClick={deleteComment}
                    className="flex items-center text-SoftRed font-medium cursor-pointer"
                  >
                    <img className="h-max w-max" src={IconDelete} alt="reply" />
                    <span className="ml-2">Delete</span>
                  </div>
                  <div
                    onClick={openEditComment}
                    className="flex items-center text-ModerateBlue font-medium ml-6 cursor-pointer"
                  >
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
          {isEditing ? (
            <form
              onSubmit={editComment}
              className="w-full flex items-start justify-between ml-3 mt-2"
            >
              <textarea
                type="text"
                placeholder="Add a comment..."
                className="border-[0.5px] border-LightGray rounded-lg text-base break-all py-2 px-3 font-normal"
                value={commentContent}
                onChange={handleInput}
              />
              <input
                className="h-10 w-20 bg-ModerateBlue text-white rounded-lg text-sm"
                type="submit"
                value="EDIT"
              />
            </form>
          ) : (
            <div className="text-GrayishBlue mt-4 break-all">
              {comment.content}
            </div>
          )}
        </div>
      </div>
      {isReplying && (
        <div className="w-full flex flex-col items-center">
          <div className="w-[44rem] flex bg-white rounded-lg p-6 mt-1">
            <img
              className="w-9 h-9"
              src={require("../assets/avatars/image-amyrobson.png")}
              alt="logged in user avatar"
            />
            <form
              onSubmit={addReply}
              className="w-full flex items-start justify-between ml-3"
            >
              <textarea
                type="text"
                placeholder="Add a comment..."
                className="border-[0.5px] border-LightGray rounded-lg text-base break-all py-2 px-3 font-normal"
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
      <div className="w-full flex flex-col items-center">
        {comment.replies &&
          comment.replies.map((reply) => (
            <Reply
              reply={reply}
              upvote={upvote}
              downvote={downvote}
              addReply={addReply}
              deleteReply={deleteReply}
              editReply={editReply}
              id={reply.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
