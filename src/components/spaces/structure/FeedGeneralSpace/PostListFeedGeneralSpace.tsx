/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TCategory } from "../../../../types/main";
import { postFetcher } from "../../../../utils/fetcher";
import Loader from "../../../Loader";
import PostGeneralSpace from "./PostGeneralSpace";

interface IProps {
  generalCategory: TCategory;
}

function PostListFeedGeneralSpace({ generalCategory }: IProps) {
  const {
    data: dataAllGeneralPostsInSpace,
    error: errorAllGeneralPostsInSpace,
    isLoading: isLoadingAllGeneralPostsInSpace,
  } = useQuery(["AllGeneralPostsInSpace", generalCategory.id], () =>
    postFetcher.getAllByCategory({ categoryId: generalCategory.id })
  );

  if (isLoadingAllGeneralPostsInSpace || !dataAllGeneralPostsInSpace)
    return <Loader />;
  if (errorAllGeneralPostsInSpace)
    return <div>Une erreur s&apos;est produite</div>;

  return (
    <>
      {dataAllGeneralPostsInSpace.map((post) => (
        <div key={post.id} className="mb-7">
          <PostGeneralSpace dataPost={post} />
        </div>
      ))}
    </>
  );
}

export default PostListFeedGeneralSpace;
