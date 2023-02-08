/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../../../../context/UserContext";
import { categoryFetcher, spaceFetcher } from "../../../../utils/fetcher";
import LoaderFocus from "../../../structureShared/LoaderFocus";

interface IProps {
  setCategoryChosen: (category: string[]) => void;
}

function CategoryChoosingHP({ setCategoryChosen }: IProps) {
  const { user } = useAuth();

  const {
    isLoading: isLoadingSpaces,
    error: errorSpaces,
    data: dataSpacesByUserAuth,
  } = useQuery(
    ["dataSpacesByUserAuth", user?.id],
    () => user && spaceFetcher.getAll()
  );
  const {
    isLoading: isLoadingCategories,
    error: errorCategories,
    data: dataCategoriesByUserAuth,
  } = useQuery(
    ["dataCategoriesByUserAuth", user?.id],
    () => user && categoryFetcher.getAll()
  );

  if (
    isLoadingCategories ||
    !dataCategoriesByUserAuth ||
    isLoadingSpaces ||
    !dataSpacesByUserAuth ||
    !user
  )
    return <LoaderFocus />;
  if (errorCategories || errorSpaces)
    return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-full flex-y-center overflow-hidden rounded-full bg-blue-enedis px-4 py-3">
      <select
        name="category"
        id="category-select"
        required
        onChange={(e) =>
          setCategoryChosen([
            e.target.value.split(",")[0]!,
            e.target.value.split(",")[1]!,
          ])
        }
        className="w-full outline-none text-mob-sm(multiuse) text-left font-enedis font-regular bg-blue-enedis text-white-enedis truncate scrollbar-hide hover:text-clip
    hover:overflow-x-visible md:text-desk-sm(textPost+multiuse)"
        placeholder="Titre de ma publication"
      >
        <option value="">Espace / Catégorie</option>
        {dataSpacesByUserAuth.map((space) => (
          <optgroup key={space.id} label={space.name}>
            {dataCategoriesByUserAuth.map(
              (category) =>
                category.spaceId === space.id && (
                  <option key={category.id} value={[category.id, space.id]}>
                    {category.name}
                  </option>
                )
            )}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default CategoryChoosingHP;
