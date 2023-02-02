/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { TCategory } from "../../../../types/main";
import { postFetcher } from "../../../../utils/fetcher";
import Loader from "../../../structureShared/Loader";
import PostGeneralSpace from "../../../posts/structurePost/displayPost/PostDisplayFull";

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

  if (dataAllGeneralPostsInSpace.length === 0) {
    return (
      <div className="flex items-center h-56 justify-center bg-background-enedis">
        <div className="relative w-1/2 h-5/6">
          <Image
            src="/assets/icons/icon-eolien.png"
            alt="Pas de post"
            fill
            className="object-scale-down object-center"
          />
        </div>
        <div className="px-3">
          <p className="mb-2">Pas encore de publication ici...</p>
          <p className="font-bold mb-2">Et si vous en écriviez une ?</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {dataAllGeneralPostsInSpace.map((post) => (
        <div key={post.id} className="mb-7 h-fit sm:mb-14">
          <PostGeneralSpace dataPost={post} />
        </div>
      ))}
    </>
  );
}

export default PostListFeedGeneralSpace;
