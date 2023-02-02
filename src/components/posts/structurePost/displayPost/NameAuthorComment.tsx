import React from "react";

interface IProps {
  firstname: string;
  lastname: string;
}

function NameAuthorComment({ firstname, lastname }: IProps) {
  return (
    <div
      className="w-fit relative z-10 max-w-[85%] flex-y-center overflow-hidden rounded-full 
      bg-blue-enedis text-white-enedis px-4 py-2"
    >
      <h3
        className="w-fit max-w-full text-mob-xs(textPost) text-left font-enedis font-regular truncate overflow-x-scroll scrollbar-hide hover:text-clip
        hover:overflow-x-visible md:text-desk-sm(textPost+multiuse)"
      >
        {firstname} {lastname.toUpperCase()}
      </h3>
    </div>
  );
}

export default NameAuthorComment;
