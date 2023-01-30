import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TComment } from "../../types/main";
import CommentItem from "./commentItem";
import CreateComment from "./createComment";

interface IProps {
  postId: string;
}

function CommentList({ postId }: IProps) {
  const [comments, setComments] = useState<TComment[]>([]);

  const { data, isLoading } = useQuery<TComment[]>([
    "comments",
    `post-${postId}`,
  ]);

  const handleSubmit = (newComment: TComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      {isLoading ? "Loading..." : null}
      {!data ? "No comment" : null}
      {data &&
        data
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((comment) => <CommentItem key={comment.id} comment={comment} />)}
      <CreateComment onSubmit={handleSubmit} />
    </div>
  );
}

export default CommentList;
