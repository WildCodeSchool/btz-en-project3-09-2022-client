import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CategoryTitle from "./CategoryTitle";
import UploadArea from "./UploadArea";
import SubmittedCategory from "./SubmittedCategory";
import ProfilePic from "./ProfilePic";
import CtaTextArea from "./CTA";
import { categoryFetcher } from "../../../utils/poster";
import { useAuth } from "../../../context/UserContext";
import { spaceFetcher } from "../../../utils/fetcher";
import Loader from "../../structureShared/Loader";
import { useModalContextSpace } from "../../../context/ModalContextCategory";
import DescriptionCategory from "./DescriptionCategory";

function CreateCategory() {
  const { user } = useAuth();
  const router = useRouter();
  const { spaceId } = router.query;
  const queryClient = useQueryClient();
  const modalContext = useModalContextSpace();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [triedToSubmit, setTriedToSubmit] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!user) {
    return <div>Please connect first</div>;
  }

  const handleSubmit = async () => {
    if (!title || !description || !image) {
      return setTriedToSubmit("missing");
    }
    if (
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") === "general" ||
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") === "generale"
    ) {
      return setTriedToSubmit("noGeneral");
    }
    const formData = new FormData();
    formData.append("categoryImage", image as File);
    formData.append("spaceId", spaceId as string);
    formData.append("ownerId", user.id);
    formData.append("name", title);
    formData.append("description", description);
    await categoryFetcher.post(formData);
    queryClient.invalidateQueries(["theSpaceWithCategories", spaceId]);
    return setSubmitted(true);
  };

  const {
    data: dataSpace,
    error: errorSpace,
    isLoading: isLoadingSpace,
  } = useQuery(["theSpaceWithCategories", spaceId], () =>
    spaceFetcher.getOneWithCategories(spaceId as string)
  );

  if (isLoadingSpace || !dataSpace) return <Loader />;
  if (errorSpace) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div>
      {!submitted ? (
        <div className="relative">
          <div className="h-fit w-full md:flex md:mb-4 md:space-x-3">
            <div className="w-full flex  justify-between mb-[10px] space-x-3 md:mb-0">
              <ProfilePic
                firstname={user.firstname}
                lastname={user.lastname}
                id={user.id}
              />
              <div className="w-fit min-w-[30%] flex-y-center overflow-hidden rounded-full border bg-blue-enedis px-4 py-3">
                <p className=" w-full truncate text-mob-sm(multiuse) text-left font-enedis font-regular text-white-enedis scrollbar-hide hover:text-clip hover:overflow-x-visible md:text-desk-md(titlePubli+multiuse)">
                  Espace {dataSpace.name}
                </p>
              </div>
              <div className="w-full md:mb-0">
                <CategoryTitle setTitle={setTitle} />
              </div>
            </div>
          </div>
          <DescriptionCategory setDescription={setDescription} />
          <UploadArea
            handleSubmit={handleSubmit}
            image={image}
            setImage={setImage}
          />
          {triedToSubmit === "missing" && (
            <p className="w-full text-mob-sm(multiuse) mt-4 font-regular text-redError-enedis">
              <span className="font-bold">ATTENTION :</span> vérifiez que votre
              catégorie a au moins un titre, une courte description et une
              photo.
            </p>
          )}
          {triedToSubmit === "noGeneral" && (
            <p className="w-full text-mob-sm(multiuse) mt-4 font-regular text-redError-enedis">
              <span className="font-bold">ATTENTION :</span> vous ne pouvez pas
              créer de catégorie &quot;Général&quot; dans un espace.
            </p>
          )}
          <div className="absolute centered-x-absolute -bottom-28">
            <CtaTextArea onClick={handleSubmit} />
          </div>
          <button
            type="button"
            onClick={modalContext?.handleClose}
            className="absolute left-0 -top-12 font-regular font-publicSans text-mob-sm(multiuse) text-white-enedis text-opacity-60"
          >
            <span className="mr-2 text-white-enedis">╳</span> Je ferme
          </button>
        </div>
      ) : (
        <SubmittedCategory />
      )}
    </div>
  );
}

export default CreateCategory;
