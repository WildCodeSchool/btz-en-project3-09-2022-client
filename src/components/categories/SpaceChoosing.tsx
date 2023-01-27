import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../context/UserContext";
import { spaceFetcher } from "../../utils/fetcher";

interface IProps {
  setSpaceChosen: (site: string) => void;
}

function SpaceChoosing({ setSpaceChosen }: IProps) {
  const { user } = useAuth();

  const {
    isLoading: isLoadingSpaces,
    error: errorSpaces,
    data: dataSpacesByUserAuth,
  } = useQuery(
    ["dataSitesByUserAuth", user?.id],
    () => user && spaceFetcher.getAll()
  );

  if (isLoadingSpaces || !dataSpacesByUserAuth || !user)
    return <div>En chargement</div>;
  if (errorSpaces) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-full flex-y-center overflow-hidden rounded-full border bg-blue-enedis px-4 py-3">
      <select
        name="category"
        id="category-select"
        required
        onChange={(e) => setSpaceChosen(e.target.value)}
        className="w-full outline-none text-mob-sm(multiuse) text-left font-enedis font-regular bg-blue-enedis text-white-enedis truncate scrollbar-hide hover:text-clip
    hover:overflow-x-visible md:text-desk-sm(textPost+multiuse)"
        placeholder="Titre de ma publication"
      >
        <option value="">Sélectionner un espace</option>
        {dataSpacesByUserAuth.map((space) => (
          <option key={space.id} value={space.name}>
            {space.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SpaceChoosing;
