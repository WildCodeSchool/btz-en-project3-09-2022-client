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
      <div className=" w-1/6 flex flex-col items-center">
        <ProfilePicMini
          id={comment.authorId}
          firstname={comment.author?.firstname || "firstname"}
          lastname={comment.author?.lastname || "lastname"}
          imageUrl={comment.author?.imageUrl || "picture/profile"}
          key={comment.authorId}
        />
        <DatePost datePost={comment.createdAt} key={comment.id} />
      </div>
      <div>
        <NameAuthorPost
          id={comment.authorId}
          firstname={comment.author?.firstname || "firstname"}
          lastname={comment.author?.lastname || "lastname"}
          key={comment.id}
        />
        <p className="bg-white-enedis rounded-app-bloc p-4 ml-8">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
