import React from "react";
import ModalPost from "../modal/ModalPost";
import CTA from "../structure/CTA";
import CreateSpace from "./CreateSpace";

export default function Space() {
  return (
    <div className="flex justify-between mt-6">
      <div className="w-1/4 min-w-[110px] max-w-[200px] bg-blue-enedis rounded-app-bloc flex-all-center p-3">
        <p className="text-mob-md(CTA+input) font-enedis font-bold text-white-enedis">
          Souhaitez-vous créer un espace ?
        </p>
      </div>
      <ModalPost Opener={CTA} Content={CreateSpace} />
    </div>
  );
}
