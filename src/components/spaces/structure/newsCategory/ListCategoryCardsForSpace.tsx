/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image from "next/image";
import React from "react";
import { TSpace } from "../../../../types/main";
import CategoryCardForSpace from "./CategoryCardForSpace";

interface IProps {
  dataSpace: TSpace;
}

function ListCategoryCardsForSpace({ dataSpace }: IProps) {
  const { categories } = dataSpace;

  if (
    categories!.length === 0 ||
    (categories!.length === 1 &&
      categories![0]!.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") === "general")
  ) {
    return (
      <div className="flex items-center h-56 justify-center bg-background-enedis">
        <div className="relative w-1/2 h-5/6">
          <Image
            src="/assets/icons/icon-eolien.png"
            alt="Pas de post"
            fill
            className="object-scale-down object-center"
          />
        </div>
        <div className="px-3">
          <p className="mb-2">Pas encore de catégorie ici...</p>
          <p className="font-bold mb-2">Et si vous en créiez une ?</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {categories!
        .filter(
          (category) =>
            category.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "") !== "general"
        )
        .map((category) => (
          <CategoryCardForSpace oneCategory={category} key={category.id} />
        ))}
    </>
  );
}

export default ListCategoryCardsForSpace;
