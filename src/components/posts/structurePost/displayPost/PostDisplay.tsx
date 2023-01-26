/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import { TPost, TSpace } from "../../../../types/main";
import { postFetcher } from "../../../../utils/fetcher";
import ProfilePicMini from "../../../structure/ProfilePicMini";
import CategoryPost from "./CategoryPost";
import DatePost from "./DatePost";
import ImagePost from "./ImagePost";
import TextPost from "./TextPost";
import TitlePost from "./TitlePost";

interface IProps {
  oneSpace: TSpace;
}

function PostDisplay({ oneSpace }: IProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [postAllCategories, setPostAllCategories] = useState<TPost>();

  const getLatestPostByCategory = async () => {
    setIsLoading(true);
    const latestPost = await postFetcher.getLatestPostBySpaceWithImage({
      spaceId: oneSpace.id,
    });
    setPostAllCategories(latestPost[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    getLatestPostByCategory();
  }, []);

  if (isLoading) {
    return <div>En chargement</div>;
  }

  if (
    !postAllCategories ||
    !postAllCategories.category ||
    !postAllCategories.author
  ) {
    return (
      <div className="w-full h-full p-5 flex-x-center mt-20 text-mob-md(CTA+input)">
        Aucune publication dans cet espace :
        <br />
        <span className="text-mob-xl(headers+titles) font-bold">
          choisissez une catégorie et publiez !
        </span>
      </div>
    );
  }

  return (
    <div className="relative px-4 py-3">
      <div className="flex mb-[10px]">
        <ProfilePicMini
          firstname={postAllCategories.author.firstname}
          lastname={postAllCategories.author.lastname}
          imageUrl={postAllCategories.author.imageUrl}
        />
        <TitlePost title={postAllCategories.title} />
      </div>
      <div className="w-full flex justify-between">
        <TextPost text={postAllCategories.content} />
        <div className="w-[38%] min-w-[130px] h-[208px] flex flex-col justify-between ml-3">
          <div className="flex items-center justify-between">
            <CategoryPost categoryName={postAllCategories.category.name} />
            <DatePost datePost={postAllCategories.createdAt} />
          </div>
          {postAllCategories.images?.length === 1 && (
            <ImagePost
              srcImage={postAllCategories.images[0]!.url}
              nameImage={postAllCategories.images[0]!.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDisplay;
