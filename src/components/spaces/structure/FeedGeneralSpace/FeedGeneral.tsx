import React from "react";
import { TCategory, TSpace } from "../../../../types/main";
import TitleSection from "../../../structureShared/TitleSection";
import SpacePublicationFirstArea from "./SpacePublicationFirstArea";
import PostListFeedGeneralSpace from "./PostListFeedGeneralSpace";

interface IProps {
  dataSpace: TSpace;
}

function FeedGeneral({ dataSpace }: IProps) {
  const getTheGeneralCategory = (array: TCategory[]) => {
    return array.filter(
      (category) =>
        category.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === "general"
    )[0];
  };

  const generalCategory = getTheGeneralCategory(
    dataSpace.categories as TCategory[]
  );

  if (!generalCategory) {
    return (
      <div>
        Il n&apos;y a pas de catégorie &quot;Général&quot; dans cet espace,
        merci de contacter l&apos;administrateur pour qu&apos;il en créé une.
      </div>
    );
  }

  return (
    <div>
      <SpacePublicationFirstArea dataSpace={dataSpace} />
      <TitleSection
        titleText={`À la Une sur l'espace
${dataSpace.name}`}
      />
      <PostListFeedGeneralSpace generalCategory={generalCategory} />
    </div>
  );
}

export default FeedGeneral;
