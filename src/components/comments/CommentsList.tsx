import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { TComment } from "../../types/main";
import { commentFetcher } from "../../utils/fetcher";
import LoaderFocus from "../structureShared/LoaderFocus";
import CommentItemMe from "./CommentItemMe";
import CommentItemOthers from "./CommentItemOthers";
import CreateComment from "./createComment";

interface IProps {
  postID: string;
}

function CommentsList({ postID }: IProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<TComment[]>([]);

  const { data: dataComments, isLoading: isLoadingComments } = useQuery(
    ["AllComments", postID],
    () => commentFetcher.getAllByPostWithAuthor({ postId: postID })
  );

  const handleSubmit = (newComment: TComment) => {
    setComments([...comments, newComment]);
  };

  if (!user) {
    return <div>Please connect first</div>;
  }
  if (isLoadingComments) {
    return <LoaderFocus />;
  }

  return (
    <div>
      {dataComments &&
        dataComments.map((comment) => {
          if (comment.authorId === user.id) {
            return <CommentItemMe key={comment.id} comment={comment} />;
          }
          return <CommentItemOthers key={comment.id} comment={comment} />;
        })}
      <CreateComment onSubmit={handleSubmit} postID={postID} />
    </div>
  );
}

export default CommentsList;
