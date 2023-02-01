import React from "react";

interface IProps {
  firstname: string;
  lastname: string;
}

function NameAuthorPost({ firstname, lastname }: IProps) {
  return (
    <div
      className="w-full flex-y-center overflow-hidden rounded-full 
      bg-blue-enedis text-white-enedis px-4 py-2 ml-2"
    >
      <h3
        className="w-full text-mob-sm(multiuse) text-left font-enedis font-regular truncate overflow-x-scroll scrollbar-hide hover:text-clip
        hover:overflow-x-visible md:text-desk-md(titlePubli+multiuse)"
      >
        {firstname} {lastname}
      </h3>
    </div>
  );
}

export default NameAuthorPost;
