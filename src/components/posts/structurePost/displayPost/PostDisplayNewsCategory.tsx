/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TCategory } from "../../../../types/main";
import { postFetcher } from "../../../../utils/fetcher";
import ProfilePicMini from "../../../structureShared/ProfilePicMini";
import DatePost from "./DatePost";
import ImagePost from "./ImagePost";
import NameAuthorPost from "./NameAuthorPost";
import TextPostFullWidth from "./TextPostFullWidth";
import TitlePostBorder from "./TitlePostBorder";

interface IProps {
  oneCategory: TCategory;
}

function PostDisplayNewsCategory({ oneCategory }: IProps) {
  const {
    isLoading: isLoadingLatestPostByCategory,
    error: errorLatestPostByCategory,
    data: dataLatestPostByCategory,
  } = useQuery(["latestPostByCategory", oneCategory.id], () =>
    postFetcher.getLatestPostByCategoryWithImage({ categoryId: oneCategory.id })
  );

  if (isLoadingLatestPostByCategory || !dataLatestPostByCategory) {
    return <div>En chargement</div>;
  }
  if (errorLatestPostByCategory) {
    return <div>Une erreur s&apos;est produite</div>;
  }

  if (dataLatestPostByCategory.length !== 1) {
    return (
      <div className="w-full h-full p-5 flex-x-center mt-20 text-mob-sm(multiuse)">
        Aucune publication dans cette categorie :
        <br />
        <span className="text-mob-lg(multiuse) font-bold">
          créez-en une et publiez !
        </span>
      </div>
    );
  }

  const latestPost = dataLatestPostByCategory[0];

  return (
    <div className="relative px-5 py-4">
      <div className="flex mb-4">
        <ProfilePicMini
          firstname={latestPost.author!.firstname}
          lastname={latestPost.author!.lastname}
          imageUrl={latestPost.author!.imageUrl}
        />
        <NameAuthorPost
          firstname={latestPost.author!.firstname}
          lastname={latestPost.author!.lastname.toUpperCase()}
        />
        <DatePost datePost={latestPost.createdAt} />
      </div>
      <div className="w-full h-fit mb-4 relative">
        <div className="relative z-20">
          <TitlePostBorder title={latestPost.title} />
        </div>
        <div className="-mt-3">
          <TextPostFullWidth text={latestPost.content} />
        </div>
      </div>
      <div className="w-full flex-x-center">
        {latestPost.images?.length === 1 && (
          <ImagePost
            srcImage={latestPost.images[0]!.url}
            nameImage={latestPost.images[0]!.name}
          />
        )}
      </div>
    </div>
  );
}

export default PostDisplayNewsCategory;
