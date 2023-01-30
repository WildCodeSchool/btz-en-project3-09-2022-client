/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { spaceFetcher } from "../../../../utils/fetcher";

interface IProps {
  setCategoryChosen: (category: string[]) => void;
}

function CategoryChoosingInSpace({ setCategoryChosen }: IProps) {
  const router = useRouter();
  const { spaceId } = router.query;

  const {
    data: dataSpace,
    error: errorSpace,
    isLoading: isLoadingSpace,
  } = useQuery(["theSpaceWithCategories", spaceId], () =>
    spaceFetcher.getOneWithCategories(spaceId as string)
  );

  if (isLoadingSpace || !dataSpace)
    return <div className="text-mob-sm(multiuse)">En chargement</div>;
  if (errorSpace) return <div>Une erreur s&apos;est produite</div>;

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
        <option value="">Catégories</option>
        <optgroup key={dataSpace.id} label={dataSpace.name}>
          {dataSpace.categories!.map((category) => (
            <option key={category.id} value={[category.id, dataSpace.id]}>
              {category.name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

export default CategoryChoosingInSpace;
