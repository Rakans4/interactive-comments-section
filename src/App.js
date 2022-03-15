import "./App.css";
import React, { useState, useReducer } from "react";
import Comment from "./components/comment";
import { initialComments, currentUser, commentsReducer } from "./state";

export default function App() {
  const [comments, dispatch] = useReducer(commentsReducer, initialComments);

  return (
    <div className="font-sans">
      <div className="w-screen flex flex-col items-center">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      <div className="w-screen flex flex-col items-center">
        <div className="w-[44rem] flex bg-white rounded-lg p-6 my-3">
          <img
            src={require(`${currentUser.image.png}`)}
            alt="logged in user avatar"
          />
          <form>
            <input
              type="text"
              placeholder="Add a comment..."
              className="border-[0.5px] border-LightGray h-full rounded-lg text-base"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
