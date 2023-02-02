import React from "react";
import { TCategory } from "../../../../types/main";
import TitleSection from "../../../structureShared/TitleSection";
import CategoryPublicationFirstArea from "./CategoryPublicationFirstArea";
import PostListFeedCategory from "./PostListFeedCategory";

interface IProps {
  dataCategory: TCategory;
}

function FeedCategory({ dataCategory }: IProps) {
  return (
    <div className="w-full">
      <CategoryPublicationFirstArea dataCategory={dataCategory} />
      <TitleSection
        titleText={`À la Une sur la catégorie ${dataCategory.name}`}
      />
      <PostListFeedCategory dataCategory={dataCategory} />
    </div>
  );
}

export default FeedCategory;
