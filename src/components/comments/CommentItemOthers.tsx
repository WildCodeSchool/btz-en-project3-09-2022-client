/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { TComment } from "../../types/main";
import DatePost from "../posts/structurePost/displayPost/DatePost";
import NameAuthorComment from "../posts/structurePost/displayPost/NameAuthorComment";
import ProfilePic from "../structureShared/ProfilePic";

interface IProps {
  comment: TComment;
}

function CommentItemOthers({ comment }: IProps) {
  return (
    <div className="flex mb-[15px]">
      <div className="w-fit max-w-[50px] flex-x-center space-y-2">
        <ProfilePic
          firstname={comment.author!.firstname}
          lastname={comment.author!.lastname}
          imageUrl={comment.author!.imageUrl}
          id={comment.author!.id}
        />
        <DatePost datePost={comment.createdAt} noMarginLeft />
      </div>
      <div className="flex flex-col w-full sm:max-w-[70%] ml-3">
        <NameAuthorComment
          firstname={comment.author!.firstname}
          lastname={comment.author!.lastname}
          id={comment.author!.id}
        />
        <p
          className="w-full bg-white-enedis relative z-0 text-left rounded-app-bloc text-mob-xs(textPost) break-words px-4 pt-7 pb-3 -mt-3
        md:text-desk-sm(textPost+multiuse)"
        >
          {comment.content}
        </p>
      </div>
    </div>
  );
}

export default CommentItemOthers;
