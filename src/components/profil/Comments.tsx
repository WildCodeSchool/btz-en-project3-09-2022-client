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
          firstname={comment.author.firstname}
          lastname={comment.author.lastname}
          imageUrl={comment.author.imageUrl}
          key={comment.authorId}
        />
        <DatePost datePost={comment.createdAt} key={comment.id} />
      </div>
      <div>
        <NameAuthorPost
          firstname={comment.author.firstname}
          lastname={comment.author.lastname}
          key={comment.id}
        />
        <p className="bg-white-enedis rounded-app-bloc p-4 ml-8">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
