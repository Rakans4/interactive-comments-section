import React, { useState } from "react";

const Comment = () => {
    //state for testing
  const [comment, setComment] = useState({
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
    },
    replies: [],
  });
  return (
    <div>
      <div>
          +
        <div>{comment.score}</div>
        -
      </div>
      <div>
        <div>
          <img
            src={require("../assets/avatars/image-amyrobson.png")}
            alt="avatar"
          />
          <div>{comment.username}</div>
          <div>{comment.createdAt}</div>
        </div>
        <div>{comment.content}</div>
      </div>
    </div>
  );
};

export default Comment;
