import React, { useState } from "react";
import Image from "next/image";
import Espace from "./espace";

function Footer() {
  const [openEspace, setOpenEspace] = useState(false);
  const handleClickEspace = () => {
    setOpenEspace(!openEspace);
  };

  return (
    <div>
      <hr className="bg-vert h-1" />
      <div>
        {openEspace && (
          <div className="h-2/3 bg-bleu_leger flex flex-col justify-center items-center p-2 ">
            <div className=" w-2/6  text-black font-bold flex justify-center ">
              Mes espaces
            </div>
            <hr className="bg-bleu h-1 w-1/3 rounded-full" />
            <div>
              <Espace />
            </div>
          </div>
        )}
      </div>

      <div className="bg-bleu flex justify-around p-1 w-full">
        <Image
          src="/logo_enedis/picto_profil_vert.svg"
          width={28}
          height={40}
          alt="logo choix categories"
        />
        {openEspace ? (
          <Image
            src="/logo_enedis/picto_espace_white.svg"
            width={40}
            height={40}
            alt="logo carte des espaces"
            onClick={handleClickEspace}
            className="bg-white rounded-md p-1"
          />
        ) : (
          <Image
            src="/logo_enedis/picto_espace_vert.svg"
            width={40}
            height={40}
            alt="logo carte des espaces"
            onClick={handleClickEspace}
          />
        )}

        <Image
          src="/logo_enedis/picto_notif_vert.svg"
          width={40}
          height={40}
          alt="logo des notifications"
        />
      </div>
    </div>
  );
}

export default Footer;
