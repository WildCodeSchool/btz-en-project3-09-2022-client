import React from "react";
import { TComment } from "../../types/main";

interface IProps {
  comment: TComment;
}

function CommentItem({ comment }: IProps) {
  return (
    <div>
      <div className="bg-blue-enedis rounded-app-bloc text-mob-sm(multiuse) texte-white">
        {comment.authorId}
      </div>
      <div className="bg-white-enedis rounded-app-bloc text-mob-xs(textPost) static px-10 py-4">
        {comment.content}
      </div>
    </div>
  );
}

export default CommentItem;
