import React from "react";

interface IProps {
  title: string;
}

function TitlePostBorder({ title }: IProps) {
  return (
    <div className="w-full flex-y-center overflow-hidden rounded-full border border-blue-enedis bg-white-enedis px-4 py-2">
      <h3
        className="w-full text-mob-sm(multiuse) text-left font-enedis font-regular truncate overflow-x-scroll scrollbar-hide hover:text-clip
        hover:overflow-x-visible md:text-desk-md(titlePubli+multiuse)"
      >
        {title}
      </h3>
    </div>
  );
}

export default TitlePostBorder;
