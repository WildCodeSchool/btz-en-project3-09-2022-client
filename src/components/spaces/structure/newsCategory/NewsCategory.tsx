import React from "react";
import { TSpace } from "../../../../types/main";
import TitleSection from "../../../structureShared/TitleSection";
import ListCategoryCardsForSpace from "./ListCategoryCardsForSpace";

interface IProps {
  dataSpace: TSpace;
}

function NewsCategory({ dataSpace }: IProps) {
  return (
    <div className="w-[95%] md:w-[85%]">
      <TitleSection titleText="News de mes catégories" whiteText />
      <ListCategoryCardsForSpace dataSpace={dataSpace} />
    </div>
  );
}

export default NewsCategory;
