import React from "react";

interface IProps {
  title: string;
  isProfilPage?: boolean;
}

function TitlePost({ title, isProfilPage }: IProps) {
  return (
    <div
      className={`w-full flex-y-center overflow-hidden rounded-full border px-4 py-2 ml-2 ${
        window.location.href.includes("category") ||
        window.location.href.includes("space")
          ? "bg-blue-enedis text-white-enedis"
          : "border-blue-enedis bg-white-enedis"
      } `}
    >
      <div className="flex items-center">
        <h3
          className="w-full text-mob-sm(multiuse) md:text-desk-md(titlePubli+multiuse) text-left font-enedis font-regular truncate overflow-x-scroll scrollbar-hide hover:text-clip
        hover:overflow-x-visible"
        >
          {title}
        </h3>
        {isProfilPage && (
          <div className="text-blue-enedis text-mob-lg(multiuse)">+</div>
        )}
      </div>
    </div>
  );
}

export default TitlePost;
