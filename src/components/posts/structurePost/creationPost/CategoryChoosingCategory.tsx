/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { categoryFetcher } from "../../../../utils/fetcher";

interface IProps {
  setCategoryChosen: (category: string[]) => void;
}

function CategoryChoosingCategory({ setCategoryChosen }: IProps) {
  const router = useRouter();
  const { categoryId } = router.query;

  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useQuery(["theCategory", categoryId], () =>
    categoryFetcher.getOne(categoryId as string)
  );

  if (isLoadingCategory || !dataCategory)
    return <div className="text-mob-sm(multiuse)">En chargement</div>;
  if (errorCategory) return <div>Une erreur s&apos;est produite</div>;

  useEffect(() => {
    setCategoryChosen([dataCategory.id]);
  }, []);

  return (
    <div className="w-fit min-w-[30%] flex-y-center overflow-hidden rounded-full bg-blue-enedis px-4 py-3">
      <p
        className=" w-full truncate text-mob-sm(multiuse) text-left font-enedis
        font-regular text-white-enedis scrollbar-hide hover:text-clip
        hover:overflow-x-visible md:text-desk-md(titlePubli+multiuse)"
      >
        Cat. {dataCategory.name}
      </p>
    </div>
  );
}

export default CategoryChoosingCategory;
