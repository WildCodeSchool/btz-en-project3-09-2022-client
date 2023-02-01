import React from "react";
import { TCategory } from "../../types/main";

type Props = {
  category: TCategory;
};

function ImageCategory({ category }: Props) {
  return (
    <div className="relative z-0 w-[calc(100%-8px)] h-[48px] md:h-[64px] lg:px-0 mb-1">
      <img
        src={category.imageUrl}
        alt={category.id}
        className="rounded-app-bloc object-cover absolute z-10 h-full w-full "
      />
      <p className="absolute centered-absolute text-white-enedis text-desk-xs(date) md:text-desk-md(titlePubli+multiuse) z-40 font-enedis font-bold ">
        {category.name}
      </p>
      <div className=" bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-30 rounded-app-bloc w-full h-full" />
    </div>
  );
}

export default ImageCategory;
