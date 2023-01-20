import { useQuery } from "@tanstack/react-query";
import React from "react";
import { commentFetcher } from "../../utils/fetcher";
import CommentItem from "./commentItem";

interface IProps {
  postId: string;
}

function CommentList({ postId }: IProps) {
  const { data, isLoading } = useQuery(["comments", `post-${postId}`], () =>
    commentFetcher.getAllByPostId(postId)
  );

  if (!data) return "No comment";
  if (isLoading) return "Loading ...";

  return (
    <div>
      {data.map((comment) => (
        <CommentItem comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
