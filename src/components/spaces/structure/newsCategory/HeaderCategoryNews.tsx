import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TCategory } from "../../../../types/main";

interface IProps {
  oneCategory: TCategory;
}

function HeaderCategoryNews({ oneCategory }: IProps) {
  const router = useRouter();
  const { spaceId } = router.query;

  const { imageUrl, name } = oneCategory;
  return (
    <Link
      href={`${spaceId}/category/${oneCategory.id}`}
      className="h-full w-full"
    >
      <div className="w-full relative z-0 h-[75px] md:h-[90px]">
        <div className="w-full h-full bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-20" />
        <Image
          alt={name || "space name"}
          src={imageUrl || "/space_image.png"}
          fill
          className="object-cover relative z-10 min-h-full"
        />
        <div className="absolute z-30 centered-absolute w-full font-enedis text-white-enedis">
          <h1 className="font-bold text-desk-2xl(headerCard)">{name}</h1>
        </div>
      </div>
    </Link>
  );
}
export default HeaderCategoryNews;
