import React from "react";

type Props = { titleText: string };

function TitleSection({ titleText }: Props) {
  return (
    <div className="mb-7 mt-8">
      <h2 className="font-enedis font-bold text-mob-xl(headers+titles) md:text-desk-xl(section)">
        {titleText}
      </h2>
      <div className="w-full max-w-[235px] h-[5px] bg-blue-enedis rounded-full mx-auto mt-3" />
    </div>
  );
}

export default TitleSection;
