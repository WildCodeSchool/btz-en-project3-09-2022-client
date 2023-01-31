import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { spaceFetcher } from "../../../utils/fetcher";
import MyProfileLeftBar from "../Shared/MyProfileLeftBar";
import ListMembersSpace from "./ListMembersSpace";
import NavigationSpaces from "../../spaces/structure/NavigationSpaces";
import TitleSection from "../../structureShared/TitleSection";

function LeftBarSpace() {
  const router = useRouter();
  const { spaceId } = router.query;

  const {
    data: dataSpace,
    error: errorSpace,
    isLoading: isLoadingSpace,
  } = useQuery(["theSpace", spaceId], () =>
    spaceFetcher.getOneWithCategories(spaceId as string)
  );

  if (isLoadingSpace || !dataSpace) return <div>En chargement</div>;
  if (errorSpace) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-1/3 h- hidden md:flex-x-center min-w-[200px] bg-background-enedis flex-x-center mx-auto">
      <div className="w-[85%]">
        <MyProfileLeftBar />
        <div className="mb-10">
          <TitleSection titleText="Description de l'espace" />
          <p className="text-desk-sm(textPost+multiuse) text-left">
            {dataSpace.description}
          </p>
        </div>
        <div className="mb-10">
          <TitleSection titleText="Membres de l'espace" />
          <ListMembersSpace dataSpace={dataSpace} />
        </div>
        <div className="mb-10">
          <TitleSection titleText="Mes espaces" />
          <NavigationSpaces />
        </div>
      </div>
    </div>
  );
}

export default LeftBarSpace;
