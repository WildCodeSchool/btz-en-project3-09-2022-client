import React from "react";
import PostTitle from "./PostTitle";
import ProfilePic from "./ProfilePic";
import UploadArea from "./UploadArea";
import WysiwygTextArea from "./WysiwygTextArea";

function CreatePost() {
  return (
    <div className="w-[100%] bg-white-enedis">
      <ProfilePic />
      <PostTitle />
      <WysiwygTextArea />
      <UploadArea />
    </div>
  );
}

export default CreatePost;
