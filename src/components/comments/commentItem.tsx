import React from "react";
import { TComment } from "../../types/main";

interface IProps {
  comment: TComment;
}

function CommentItem({ comment }: IProps) {
  return <div>{comment.content}</div>;
}

export default CommentItem;
