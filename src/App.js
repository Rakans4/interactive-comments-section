import "./App.css";
import React, { useState, useReducer } from "react";
import Comment from "./components/comment";
import { initialComments, currentUser, commentsReducer } from "./state";
import { v4 as uuid } from 'uuid';

export default function App() {
  const [comments, dispatch] = useReducer(commentsReducer, initialComments);

  function addNewComment(e) {
    e.preventDefault();
    let id = uuid(),
      content = e.target.firstChild.value,
      createdAt = new Date().toDateString(),
      score = 0,
      replies = [];

    let newComment = {
      id: id,
      content: content,
      createdAt: createdAt,
      score:score,
      user: currentUser,
      replies: replies
    }
    dispatch({type: 'add', comment: newComment});

    console.log(newComment);
  }

  function deleteComment(id){
    console.log(id);
    
    dispatch({type: 'delete', id:id});
    console.log(comments);
  }

  return (
    <div className="font-sans">
      <div className="w-screen flex flex-col items-center">
        {comments.map((comment) => (
          <Comment comment={comment} delete={deleteComment} key={comment.id} />
        ))}
      </div>
      <div className="w-screen flex flex-col items-center">
        <div className="w-[44rem] flex bg-white rounded-lg p-6 my-3">
          <img
          className="w-9 h-9"
            src={require(`${currentUser.image.png}`)}
            alt="logged in user avatar"
          />
          <form onSubmit={addNewComment} className="w-full flex items-start justify-between ml-3">
            <textarea
              type="text"
              placeholder="Add a comment..."
              className="border-[0.5px] border-LightGray rounded-lg text-base break-all py-2 px-3 font-normal"
            />
            <input className="h-10 w-20 bg-ModerateBlue text-white rounded-lg text-sm" type="submit" value="SEND" />
          </form>
        </div>
      </div>
    </div>
  );
}
