import React from "react";

type Props = { titleText: string; whiteText?: boolean | null };

function TitleSection({ titleText, whiteText }: Props) {
  return (
    <div className="mb-7 mt-8">
      <h2
        className={`font-enedis font-bold ${
          whiteText && "text-white-enedis"
        } text-mob-xl(headers+titles) md:text-desk-xl(section)`}
      >
        {titleText}
      </h2>
      <div
        className={`w-full max-w-[235px] h-[5px] ${
          whiteText ? "bg-background-enedis" : "bg-blue-enedis"
        } rounded-full mx-auto mt-3`}
      />
    </div>
  );
}

export default TitleSection;
