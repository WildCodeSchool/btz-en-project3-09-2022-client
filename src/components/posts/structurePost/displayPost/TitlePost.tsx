import React from "react";

interface IProps {
  title: string;
}

function TitlePost({ title }: IProps) {
  return (
    <div
      className={`w-full flex-y-center overflow-hidden rounded-full border px-4 py-2 ml-2 ${
        window.location.href.includes("category") ||
        window.location.href.includes("space")
          ? "bg-blue-enedis text-white-enedis"
          : "border-blue-enedis bg-white-enedis"
      }`}
    >
      <h3
        className="w-full text-mob-sm(multiuse) text-left font-enedis font-regular truncate overflow-x-scroll scrollbar-hide hover:text-clip
        hover:overflow-x-visible md:text-desk-md(titlePubli+multiuse)"
      >
        {title}
      </h3>
    </div>
  );
}

export default TitlePost;
