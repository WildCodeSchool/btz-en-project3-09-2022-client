import Link from "next/link";
import React from "react";

interface IProps {
  firstname: string;
  lastname: string;
  id: string;
}

function NameAuthorPost({ firstname, lastname, id }: IProps) {
  return (
    <Link
      href={`/profile/${id}`}
      className="w-full flex-y-center overflow-hidden rounded-full 
      bg-blue-enedis text-white-enedis px-4 py-2 ml-2"
    >
      <h3
        className="w-full text-mob-sm(multiuse) text-left font-enedis font-regular truncate overflow-x-scroll scrollbar-hide hover:text-clip
        hover:overflow-x-visible md:text-desk-md(titlePubli+multiuse)"
      >
        {firstname} {lastname.toUpperCase()}
      </h3>
    </Link>
  );
}

export default NameAuthorPost;
