import { useQuery } from "@tanstack/react-query";
import React from "react";
import { commentFetcher } from "../../utils/fetcher";
import CommentItem from "./commentItem";
import CreateComment from "./createComment";

interface IProps {
  postId: string;
}

function CommentList({ postId }: IProps) {
  const { data, isLoading } = useQuery(["comments", `post-${postId}`], () =>
    commentFetcher.getAllByPostId(postId)
  );

  return (
    <div>
      {isLoading ? "Loading..." : null}
      {!data ? "No comment" : null}
      {data && data.map((comment) => <CommentItem comment={comment} />)}
      <CreateComment />
    </div>
  );
}

export default CommentList;
