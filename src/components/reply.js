import React from "react";
import IconPlus from "../assets/icon-plus.svg";
import IconMinus from "../assets/icon-minus.svg";
import IconReply from "../assets/icon-reply.svg";
import IconEdit from "../assets/icon-edit.svg";
import IconDelete from "../assets/icon-delete.svg";

const Reply = ({ reply }) => {
  return (
    <div className="w-full  ml-[10%] border-l-2 border-l-LightGray">
      <div className="flex bg-white w-[90%] rounded-lg p-6 my-3 ml-[5%]">
        <div className="bg-VeryLightGray w-24 h-24 flex flex-col justify-between items-center py-4 rounded-lg text-ModerateBlue">
          <img className="w-max h-max" src={IconPlus} alt="plus score" />
          <div className="font-medium">{reply.score}</div>
          <img className="w-max h-max" src={IconMinus} alt="minus score" />
        </div>
        <div className="ml-6">
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
            <div className="flex items-center text-ModerateBlue font-medium">
              <img className="h-max w-max" src={IconReply} alt="reply" />
              <span className="ml-2">Reply</span>
            </div>
            {/* <div className="flex items-center text-ModerateBlue font-medium">
              <img className="h-max w-max" src={IconEdit} alt="reply" />
              <span className="ml-2">Edit</span>
            </div>
            <div className="flex items-center text-SoftRed font-medium">
              <img className="h-max w-max" src={IconDelete} alt="reply" />
              <span className="ml-2">Delete</span>
            </div> */}
          </div>
          <div className="text-GrayishBlue mt-4">{reply.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
