import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { categoryFetcher } from "../../../utils/fetcher";
import MyProfileLeftBar from "../Shared/MyProfileLeftBar";
import NavigationSpaces from "../../spaces/structure/NavigationSpaces";
import TitleSection from "../../structureShared/TitleSection";
import ListMembersCategory from "./ListMembersCategory";
import { useAuth } from "../../../context/UserContext";
import ModalAddUserInCategory from "../../modal/ModalAddUserInCategory";
import CTACutForCategoryModals from "../../structureShared/CTACutForCategoryModals";
import CTAAddForCategoryModals from "../../structureShared/CTAAddForCategoryModals";
import AddUser from "../../categories/manageCategory/AddUser";
import ModalCutUserInCategory from "../../modal/ModalCutUserInCategory";
import CutUser from "../../categories/manageCategory/CutUser";

function LeftBarCategory() {
  const router = useRouter();
  const { categoryId } = router.query;
  const { user } = useAuth();

  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useQuery(["theCategory", categoryId], () =>
    categoryFetcher.getOneWithSpace(categoryId as string)
  );

  if (isLoadingCategory || !dataCategory) return <div>En chargement</div>;
  if (errorCategory) return <div>Une erreur s&apos;est produite</div>;

  const HandleDeleteCategory = async () => {
    // route delete category à ajouter avec await, setTimeout à supprimer
    // eslint-disable-next-line no-alert
    alert("La catégorie a bien été supprimée");
    router.push("/");
  };

  return (
    <div className="w-[25%] hidden md:flex-x-center min-w-[230px] bg-background-enedis">
      <div className="w-[82%] mb-20">
        <MyProfileLeftBar />
        <div className="mb-10">
          <TitleSection titleText="Description de la catégorie" />
          <p className="text-desk-sm(textPost+multiuse) text-left">
            {dataCategory.description}
          </p>
          {user && user.id === dataCategory.ownerId && (
            <button
              onClick={HandleDeleteCategory}
              type="button"
              className="border-[1px] border-redError-enedis text-redError-enedis rounded-full px-5 h-10 w-fit text-mob-sm(multiuse) font-regular mt-5"
            >
              Je supprime la catégorie
            </button>
          )}
        </div>
        <div className="mb-10">
          <TitleSection titleText="Membres de la catégorie" />
          <ListMembersCategory dataCategory={dataCategory} />
          <div className="flex items-center justify-center mt-5 space-x-2">
            <ModalAddUserInCategory
              Content={AddUser}
              Opener={CTAAddForCategoryModals}
            />
            <ModalCutUserInCategory
              Content={CutUser}
              Opener={CTACutForCategoryModals}
            />
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
