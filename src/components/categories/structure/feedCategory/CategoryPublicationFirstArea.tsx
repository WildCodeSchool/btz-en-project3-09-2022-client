import React from "react";
import { TCategory } from "../../../../types/main";
import ModalPost from "../../../modal/ModalPost";
import CtaTextArea from "../../../posts/HeaderPublication/CtaTextArea";
import CreatePost from "../../../posts/structurePost/creationPost/CreatePost";

interface IProps {
  dataCategory: TCategory;
}

function CategoryPublicationFirstArea({ dataCategory }: IProps) {
  return (
    <div className="w-full flex justify-between">
      <div className="w-1/3 min-w-[140px] max-w-[200px] min-h-full max-h-32 bg-blue-enedis rounded-app-bloc flex-all-center p-3">
        <p className="text-mob-md(CTA+input) font-enedis font-bold text-white-enedis">
          Envie de partager sur la catégorie {dataCategory.name} ?
        </p>
      </div>
      <div className="w-full relative bg-background-enedis ml-2 p-3">
        <ModalPost Opener={CtaTextArea} Content={CreatePost} />
      </div>
    </div>
  );
}

export default CategoryPublicationFirstArea;
