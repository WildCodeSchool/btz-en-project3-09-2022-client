import React from "react";
import Image from "next/image";

type THandleOpenAddUser = {
  HandleOpenAddUser: () => void;
};

function AddUser({ HandleOpenAddUser }: THandleOpenAddUser) {
  return (
    <div className="bg-green-enedis w-screen h-full p-2 ">
      <div className="bg-background-enedis flex-all-center rounded-app-bloc w-full p-2">
        <p className="text-mob-sm(multiuse)">Je veux ajouter un membre : </p>
        <div className="bg-blue-enedis w-full rounded-full h-10">
          <div className="flex items-center p-1 h-10">
            <Image
              src="/logo_enedis/picto_search_white.svg"
              alt=" recherche"
              width={10}
              height={10}
              className="w-9 h-8"
            />
            <input type="text" className="w-full rounded-full h-8" />
          </div>
        </div>
        <button
          onClick={HandleOpenAddUser}
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold"
        >
          Je valide
        </button>
      </div>
    </div>
  );
}

export default AddUser;
