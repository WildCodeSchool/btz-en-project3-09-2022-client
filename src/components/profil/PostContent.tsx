import { useQuery } from "@tanstack/react-query";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { TPost } from "../../types/main";
import { categoryFetcher, commentFetcher } from "../../utils/fetcher";
import CategoryPost from "../posts/structurePost/displayPost/CategoryPost";
import DatePost from "../posts/structurePost/displayPost/DatePost";
import TitlePost from "../posts/structurePost/displayPost/TitlePost";
import Loader from "../structureShared/Loader";
import LoaderFocus from "../structureShared/LoaderFocus";
import ProfilePic from "../structureShared/ProfilePic";
import Comments from "./Comments";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <LoaderFocus />,
});

type Props = {
  post: TPost;
};

export default function PostContent({ post }: Props) {
  const [showContent, setShowContent] = useState(false);

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery(["comments", `postId-${post.id}`], () =>
    commentFetcher.getCommentsByPostId(`${post.id}`)
  );

  const { data: category } = useQuery(
    ["category", `categoryId-${post.categoryId}`],
    () => categoryFetcher.getOne(`${post.categoryId}`)
  );

  const handleShowContent = () => {
    setShowContent(!showContent);
  };

  if (!category) {
    return <div>Pas de catégories</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="my-5 px-5 w-[90%] border-l-8 border-green-enedis ">
      <div className="flex  justify-between mb-2 m-auto">
        <div className="flex">
          <ProfilePic
            id={post.authorId || "id"}
            firstname={`${post.author?.firstname}`}
            lastname={`${post.author?.lastname}`}
            key={post.id}
          />
          <div className=" ml-2 ">
            <CategoryPost
              categoryName={`${post.category?.name}`}
              categoryId={post.categoryId}
              spaceId={category.spaceId}
            />
          </div>
        </div>
        <DatePost datePost={post.createdAt} />
      </div>
      <div className="flex ml-10">
        <button type="button" onClick={handleShowContent}>
          <TitlePost title={post.title} isProfilPage />
        </button>
      </div>
      {showContent && (
        <>
          <div className="bg-white-enedis rounded-app-bloc mt-2 ml-12 p-5 text-left w-fit min-w-[70%]">
            <QuillNoSSRWrapper readOnly value={post.content} theme="bubble" />
          </div>
          {comments?.map((comment) => (
            <Comments comment={comment} key={comment.id} />
          ))}
        </>
      )}
    </div>
  );
}
