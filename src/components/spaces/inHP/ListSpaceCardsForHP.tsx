import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../context/UserContext";
import { spaceFetcher } from "../../../utils/fetcher";
import SpaceCardForHP from "./SpaceCardForHP";

function ListSpaceCardsForHP() {
  const { user } = useAuth();

  const {
    isLoading: isLoadingSpaces,
    error: errorSpaces,
    data: dataSpacesByUserAuth,
  } = useQuery(
    ["dataSpacesByUserAuth", user?.id],
    () => user && spaceFetcher.getAllWithCategories()
  );

  if (isLoadingSpaces || !dataSpacesByUserAuth || !user)
    return <div>En chargement</div>;
  if (errorSpaces) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="flex flex-wrap lg:justify-between">
      {dataSpacesByUserAuth
        .filter((space) => space.name === "Général")
        .map((space) => (
          <SpaceCardForHP oneSpace={space} key={space.id} />
        ))}
      {dataSpacesByUserAuth
        .filter((space) => space.name !== "Général")
        .map((space) => (
          <SpaceCardForHP oneSpace={space} key={space.id} />
        ))}
    </div>
  );
}

export default ListSpaceCardsForHP;
