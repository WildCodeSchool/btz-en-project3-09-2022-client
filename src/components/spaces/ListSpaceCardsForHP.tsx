import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../context/UserContext";
import { spaceFetcher } from "../../utils/fetcher";
import SpaceCardForHP from "./structure/SpaceCardForHP";

function ListSpaceCardsForHP() {
  const { user } = useAuth();

  const {
    isLoading: isLoadingSpaces,
    error: errorSpaces,
    data: dataSpacesByUserAuth,
  } = useQuery(
    ["dataSpacesByUserAuth", user?.id],
    () => user && spaceFetcher.getAll()
  );

  if (isLoadingSpaces || !dataSpacesByUserAuth || !user)
    return <div>En chargement</div>;
  if (errorSpaces) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div>
      {dataSpacesByUserAuth.map((space) => (
        <SpaceCardForHP oneSpace={space} />
      ))}
    </div>
  );
}

export default ListSpaceCardsForHP;
