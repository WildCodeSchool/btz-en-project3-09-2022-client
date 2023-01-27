import React from "react";
import ModalCategory from "../modal/ModalCategory";
import CreateCategory from "./CreateCategory";
import CtaTextArea from "./CTA";

export default function Category() {
  return (
    <div className="flex justify-between mt-6">
      <div className="w-1/4 min-w-[110px] max-w-[200px] bg-blue-enedis rounded-app-bloc flex-all-center p-3">
        <p className="text-mob-md(CTA+input) font-enedis font-bold text-white-enedis">
          Souhaitez-vous créer une catégorie ?
        </p>
      </div>
      <div className="w-full h-full">
        <ModalCategory Opener={CtaTextArea} Content={CreateCategory} />
      </div>
    </div>
  );
}
