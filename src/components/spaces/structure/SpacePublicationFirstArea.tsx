import React from "react";
import { TSpace } from "../../../types/main";
import ModalPost from "../../modal/ModalPost";
import CtaTextArea from "../../posts/HeaderPublication/CtaTextArea";
import CreatePost from "../../posts/structurePost/creationPost/CreatePost";

interface IProps {
  dataSpace: TSpace;
}

function SpacePublicationFirstArea({ dataSpace }: IProps) {
  return (
    <div className="flex justify-between mt-6">
      <div className="w-1/4 min-w-[110px] max-w-[200px] h-fit max-h-32 bg-blue-enedis rounded-app-bloc flex-all-center p-3">
        <p className="text-mob-md(CTA+input) font-enedis font-bold text-white-enedis">
          Envie de partager à tous sur l&apos;espace {dataSpace.name}?
        </p>
      </div>

      <div className="w-full relative bg-background-enedis ml-2 p-3">
        <ModalPost Opener={CtaTextArea} Content={CreatePost} />
      </div>
    </div>
  );
}

export default SpacePublicationFirstArea;
