/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { TPost } from "../../../../types/main";
import CommentsList from "../../../comments/CommentsList";
import ProfilePic from "../../../structureShared/ProfilePic";
import DatePost from "./DatePost";
import ImagePostFull from "./ImagePostFull";
import TextPostFull from "./TextPostFull";
import TitlePost from "./TitlePost";

interface IProps {
  dataPost: TPost;
}

function PostDisplayFull({ dataPost }: IProps) {
  const { author } = dataPost;

  return (
    <div className="w-full max-w-[750px] bg-background-enedis flex">
      <div className="w-[7px] min-w-[7px] bg-green-enedis" />
      <div className="w-[calc(100%-7px)] max-w-[743px] p-3 xs:px-6 xs:py-4">
        <div className="w-full flex mb-[14px] sm:mb-[18px]">
          <ProfilePic
            firstname={author!.firstname}
            lastname={author!.lastname}
            imageUrl={author!.imageUrl}
            id={author!.id}
          />
          <TitlePost title={dataPost.title} />
          <DatePost datePost={dataPost.createdAt} />
        </div>
        <div className="w-full">
          <TextPostFull text={dataPost.content} />
          {dataPost.images &&
            dataPost.images?.length > 0 &&
            dataPost.images[0] && (
              <ImagePostFull
                nameImage={dataPost.images[0].name}
                srcImage={dataPost.images[0].url}
              />
            )}
        </div>
        <div className="w-full">
          <CommentsList postID={dataPost.id} />
        </div>
      </div>
    </div>
  );
}

export default PostDisplayFull;
