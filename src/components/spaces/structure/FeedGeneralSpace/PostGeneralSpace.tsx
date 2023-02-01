/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { TPost } from "../../../../types/main";
import CommentList from "../../../comments/commentList";
import ProfilePic from "../../../posts/structurePost/creationPost/ProfilePic";
import DatePost from "../../../posts/structurePost/displayPost/DatePost";
import ImagePostFull from "../../../posts/structurePost/displayPost/ImagePostFull";
import TextPostFull from "../../../posts/structurePost/displayPost/TextPostFull";
import TitlePost from "../../../posts/structurePost/displayPost/TitlePost";

interface IProps {
  dataPost: TPost;
}

function PostGeneralSpace({ dataPost }: IProps) {
  const { author } = dataPost;
  const postId = "5c1a4f50-8463-493a-83ce-a733d01967fc";

  return (
    <div className="w-full bg-background-enedis flex">
      <div className="w-[7px] bg-green-enedis" />
      <div className="w-[calc(100%-7px)] p-3 xs:px-6 xs:py-4">
        <div className="w-full flex mb-[14px] sm:mb-[18px]">
          <ProfilePic
            firstname={author!.firstname}
            lastname={author!.lastname}
            imageUrl={author!.imageUrl}
          />
          <TitlePost title={dataPost.title} />
          <DatePost datePost={dataPost.createdAt} />
        </div>
        <div className="w-full">
          <TextPostFull text={dataPost.content} />
          {dataPost.images?.length && dataPost.images[0] && (
            <ImagePostFull
              nameImage={dataPost.images[0].name}
              srcImage={dataPost.images[0].url}
            />
          )}
        </div>
        <div className="w-full h-52">Module commentaires à venir</div>
        <CommentList postId={postId} />
      </div>
    </div>
  );
}

export default PostGeneralSpace;
