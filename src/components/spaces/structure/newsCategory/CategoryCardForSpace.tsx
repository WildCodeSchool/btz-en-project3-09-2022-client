import { useRouter } from "next/router";
import React from "react";
import { TCategory } from "../../../../types/main";
import PostDisplayNewsCategory from "../../../posts/structurePost/displayPost/PostDisplayNewsCategory";
import CTAWhite from "../../../structureShared/CTAWhite";

import HeaderCategoryNews from "./HeaderCategoryNews";

interface IProps {
  oneCategory: TCategory;
}

function CategoryCardForSpace({ oneCategory }: IProps) {
  const router = useRouter();
  const { spaceId } = router.query;

  return (
    <div className="w-full mb-9">
      <div className="bg-background-enedis mb-3">
        <HeaderCategoryNews oneCategory={oneCategory} />
        <PostDisplayNewsCategory oneCategory={oneCategory} />
      </div>
      <CTAWhite
        text="Je veux en voir plus !"
        action={() => {
          router.push(`${spaceId}/category/${oneCategory.id}`);
        }}
      />
    </div>
  );
}

export default CategoryCardForSpace;
