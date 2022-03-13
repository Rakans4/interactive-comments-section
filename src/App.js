import './App.css';
import React, { useState, useReducer } from 'react';
import Comment from './components/comment';
import { initialComments, currentUser, commentsReducer } from './state';

export default function App() {
  const [comments, dispatch] = useReducer(commentsReducer, initialComments);
  

  return (
    <div className="bg-LightGray h-screen">
      {comments.map(comment => (<Comment comment={comment} key={comment.id} />))}
    </div>
  );
}
