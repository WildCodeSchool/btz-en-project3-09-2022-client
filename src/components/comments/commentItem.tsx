import Image from "next/image";
import React from "react";
import { TComment } from "../../types/main";

interface IProps {
  comment: TComment;
}

function CommentItem({ comment }: IProps) {
  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <div className="flex flex-col justify-center items-center w-1/12">
          <Image
            src={comment.author.imageUrl}
            alt="author profile"
            width={30}
            height={30}
            quality={100}
          />
          <div className="text-mob-xs(textPost)">
            {new Date(comment.createdAt).toLocaleString("fr", {
              dateStyle: "short",
            })}
            <div className="text-mob-xs(textPost)">
              {new Date(comment.createdAt).toLocaleString("fr", {
                timeStyle: "short",
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="bg-blue-enedis rounded-app-bloc text-mob-sm(multiuse) text-white-enedis flex items-center pl-3 py-1">
            {comment.author.firstname}
            <div className="uppercase">&nbsp;{comment.author.lastname}</div>
          </div>
          <div className="bg-white-enedis rounded-app-bloc border text-mob-xs(textPost) static flex items-center px-3 py-3">
            {comment.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
