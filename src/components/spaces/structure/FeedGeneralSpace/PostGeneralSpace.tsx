/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { TPost } from "../../../../types/main";
import ProfilePic from "../../../posts/structurePost/creationPost/ProfilePic";
import DatePost from "../../../posts/structurePost/displayPost/DatePost";
import TextPost from "../../../posts/structurePost/displayPost/TextPost";
import TitlePost from "../../../posts/structurePost/displayPost/TitlePost";

interface IProps {
  dataPost: TPost;
}

function PostGeneralSpace({ dataPost }: IProps) {
  const { author } = dataPost;

  return (
    <div className="w-full h-96 bg-background-enedis flex">
      <div className="w-[7px] h-full bg-green-enedis" />
      <div className="w-[calc(100%-7px)] p-3">
        <div className="w-full flex mb-[14px]">
          <ProfilePic
            firstname={author!.firstname}
            lastname={author!.lastname}
            imageUrl={author!.imageUrl}
          />
          <TitlePost title={dataPost.title} />
          <DatePost datePost={dataPost.createdAt} />
        </div>
        <div className="w-full">
          <TextPost text={dataPost.content} />
        </div>
      </div>
    </div>
  );
}

export default PostGeneralSpace;
