import React from "react";
import Modal from "../../modal/Modal";
import CreatePost from "../structurePost/CreatePost";
import CtaTextArea from "./CtaTextArea";

function PublicationFirstArea() {
  return (
    <div className="flex justify-between mt-6">
      <div className="w-1/4 min-w-[110px] max-w-[200px] h-24 bg-blue-enedis rounded-app-bloc flex-all-center p-3">
        <p className="text-mob-md(CTA+input) font-enedis font-bold text-white-enedis">
          Envie de partager à tous ?
        </p>
      </div>

      <div className="w-full relative bg-background-enedis ml-2 p-3">
        <Modal Opener={CtaTextArea} Content={CreatePost} />
      </div>
    </div>
  );
}

export default PublicationFirstArea;
