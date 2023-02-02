import Link from "next/link";
import React from "react";

interface IProps {
  categoryName: string;
  categoryId: string;
  spaceId: string;
}

function CategoryPost({ categoryName, categoryId, spaceId }: IProps) {
  return (
    <Link
      href={`space/${spaceId}/category/${categoryId}`}
      className="flex-y-center overflow-hidden rounded-full bg-blue-enedis px-3 py-3"
    >
      <h3
        className="max-w-full text-mob-xs(textPost) text-left font-enedis font-regular bg-blue-enedis text-white-enedis
        truncate overflow-x-scroll scrollbar-hide hover:text-clip hover:overflow-x-visible md:text-desk-sm(textPost+multiuse)"
      >
        {categoryName}
      </h3>
    </Link>
  );
}

export default CategoryPost;
