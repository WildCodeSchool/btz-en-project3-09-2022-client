import React from "react";

interface IProps {
  setTitle: (title: string) => void;
}

function CategoryTitle({ setTitle }: IProps) {
  return (
    <div className="w-full flex-y-center overflow-hidden rounded-full border border-blue-enedis bg-white-enedis px-4 py-3">
      <input
        required
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full outline-none text-mob-sm(multiuse) text-left font-enedis font-medium truncate scrollbar-hide hover:text-clip
        hover:overflow-x-visible md:text-desk-md(titlePubli+multiuse)"
        placeholder="Titre de ma catégorie"
      />
    </div>
  );
}

export default CategoryTitle;
