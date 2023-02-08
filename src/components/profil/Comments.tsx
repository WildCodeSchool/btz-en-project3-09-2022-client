import React from "react";
import { TComment } from "../../types/main";
import DatePost from "../posts/structurePost/displayPost/DatePost";
import ProfilePicMini from "../structureShared/ProfilePicMini";
import NameAuthorPost from "../posts/structurePost/displayPost/NameAuthorPost";

type Props = {
  comment: TComment;
};

export default function Comments({ comment }: Props) {
  return (
    <div className="flex mt-4">
      <div className=" w-1/6 flex flex-col items-center space-y-2 mt-2">
        <ProfilePicMini
          id={comment.authorId}
          firstname={comment.author?.firstname || "firstname"}
          lastname={comment.author?.lastname || "lastname"}
          key={comment.authorId}
        />
        <DatePost datePost={comment.createdAt} key={comment.id} />
      </div>
      <div className="flex flex-col items-start ml-2">
        <div className="w-fit">
          <NameAuthorPost
            id={comment.authorId}
            firstname={comment.author?.firstname || "firstname"}
            lastname={comment.author?.lastname || "lastname"}
            key={comment.id}
          />
        </div>
        <p className="bg-white-enedis rounded-app-bloc text-desk-sm(textPost+multiuse) px-6 py-5 text-left">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
