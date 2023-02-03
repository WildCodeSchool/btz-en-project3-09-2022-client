import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TCategory } from "../../../types/main";

interface IProps {
  dataCategory: TCategory;
}

function BigHeaderCategory({ dataCategory }: IProps) {
  return (
    <div className="w-full relative z-0 h-[130px] min-h-[130px] md:h-[160px] md:min-h-[160px]">
      <div className="w-full h-full bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-20" />
      <Image
        alt={dataCategory.name || "space name"}
        src={dataCategory.imageUrl || "/space_image.png"}
        fill
        className="object-cover relative z-10 min-h-full"
      />
      <div
        className="absolute z-30 top-[40%] left-[40%] md:top-1/2 md:left-[45%] transform -translate-x-1/2 -translate-y-1/2 md:centered-y-absolute
      w-2/3 font-enedis text-white-enedis"
      >
        <h2 className="text-mob-md(CTA+input) md:text-desk-lg(CTA+input) mb-1">
          Catégorie
        </h2>
        <h1 className="text-desk-2xl(headerCard) max-h-[60px] overflow-y-scroll scrollbar-hide font-bold md:text-desk-3xl(header+name)">
          {dataCategory.name}
        </h1>
      </div>
      <Link
        href={`../../../space/${dataCategory.spaceId}`}
        className="w-fit h-fit max-w-[40%] absolute z-30 bottom-4 md:centered-y-absolute right-0 bg-white-enedis
      rounded-l-full px-3 py-2 md:py-4 md:px-6 flex-y-center md:centered-y-absolute md:right-0"
      >
        <p className="text-left w-full text-mob-sm(multiuse) font-enedis font-medium md:text-desk-lg(CTA+input) truncate scrollbar-hide hover:text-clip hover:overflow-x-visible">
          Espace {dataCategory.space?.name}
        </p>
      </Link>
    </div>
  );
}

export default BigHeaderCategory;
