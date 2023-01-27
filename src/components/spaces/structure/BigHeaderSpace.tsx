import Image from "next/image";
import React from "react";
import { TSpace } from "../../../types/main";

interface IProps {
  dataSpace: TSpace;
}

function BigHeaderSpace({ dataSpace }: IProps) {
  return (
    <div className="w-full relative z-0 h-[100px] md:h-[160px]">
      <div className="w-full h-full bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-20" />
      <Image
        alt={dataSpace.name || "space name"}
        src={dataSpace.imageUrl || "/space_image.png"}
        fill
        className="object-cover relative z-10 min-h-full"
      />
      <div className="absolute z-30 centered-absolute w-full font-enedis text-white-enedis">
        <h2 className="text-mob-md(CTA+input) md:text-desk-lg(CTA+input) mb-1">
          Espace
        </h2>
        <h1 className="text-mob-3xl(welcome+name) font-bold md:text-desk-3xl(header+name)">
          {dataSpace.name}
        </h1>
      </div>
    </div>
  );
}

export default BigHeaderSpace;
