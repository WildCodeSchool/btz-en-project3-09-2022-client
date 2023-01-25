import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TComment } from "../../types/main";
import { commentFetcher } from "../../utils/fetcher";
import CommentItem from "./commentItem";
import CreateComment from "./createComment";

interface IProps {
  postId: string;
}

function CommentList({ postId }: IProps) {
  const [comments, setComments] = useState<TComment[]>([]);

  const { data, isLoading } = useQuery(["comments", `post-${postId}`], () =>
    commentFetcher.getAllByPostId(postId)
  );

  const handleSubmit = (newComment: TComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      {isLoading ? "Loading..." : null}
      {!data ? "No comment" : null}
      {data &&
        data.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      <CreateComment onSubmit={handleSubmit} />
    </div>
  );
}

export default CommentList;
