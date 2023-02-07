import React from "react";

interface IProps {
  setDescription: (description: string) => void;
}

function DescriptionCategory({ setDescription }: IProps) {
  return (
    <div className="w-full flex-y-center rounded-app-bloc h-fit bg-white-enedis px-4 py-3 mb-[10px]">
      <textarea
        required
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-[60px] outline-none text-mob-xs(textPost) text-left font-regular 
         resize-none scrollbar-hide md:text-desk-sm(textPost+multiuse)"
        placeholder="description de ma catégorie"
      />
    </div>
  );
}

export default DescriptionCategory;
