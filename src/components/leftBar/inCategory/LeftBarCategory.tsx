import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { categoryFetcher } from "../../../utils/fetcher";
import MyProfileLeftBar from "../Shared/MyProfileLeftBar";
import NavigationSpaces from "../../spaces/structure/NavigationSpaces";
import TitleSection from "../../structureShared/TitleSection";
import ListMembersCategory from "./ListMembersCategory";
import CTA from "../../structureShared/CTA";

function LeftBarCategory() {
  const router = useRouter();
  const { categoryId } = router.query;

  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useQuery(["theCategory", categoryId], () =>
    categoryFetcher.getOneWithSpace(categoryId as string)
  );

  if (isLoadingCategory || !dataCategory) return <div>En chargement</div>;
  if (errorCategory) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-[25%] hidden md:flex-x-center min-w-[230px] bg-background-enedis">
      <div className="w-[82%] mb-20">
        <MyProfileLeftBar />
        <div className="mb-10">
          <TitleSection titleText="Description de la catégorie" />
          <p className="text-desk-sm(textPost+multiuse) text-left">
            {/* {dataSpace.description} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
            tenetur ipsa. Accusamus blanditiis, enim iusto odit id expedita qui.
          </p>
        </div>
        <div className="mb-10">
          <TitleSection titleText="Membres de la catégorie" />
          <ListMembersCategory dataCategory={dataCategory} />
          <div className="flex-x-center mt-7 space-y-2">
            <CTA text="J'ajoute" action={() => {}} />
            <CTA text="Je modifie" action={() => {}} />
          </div>
        </div>
        <div className="mb-10">
          <TitleSection titleText="Mes espaces" />
          <NavigationSpaces />
        </div>
      </div>
    </div>
  );
}

export default LeftBarCategory;
