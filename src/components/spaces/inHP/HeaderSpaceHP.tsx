import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TSpace } from "../../../types/main";

interface IProps {
  oneSpace: TSpace;
}

function HeaderSpaceHP({ oneSpace }: IProps) {
  const { imageUrl, name } = oneSpace;
  return (
    <Link href={`space/${oneSpace.id}`} className="h-full w-full">
      <div className="w-full relative z-0 h-[75px] md:h-[90px]">
        <div className="w-full h-full bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-20" />
        <Image
          alt={name || "space name"}
          src={imageUrl || "/space_image.png"}
          fill
          className="object-cover relative z-10 min-h-full"
        />
        <div className="absolute z-30 centered-absolute w-full font-enedis text-white-enedis">
          <h1 className="text-mob-xl(headers+titles) font-bold md:text-desk-2xl(headerCard)">
            {name}
          </h1>
        </div>
      </div>
    </Link>
  );
}
export default HeaderSpaceHP;
