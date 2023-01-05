import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Espace from "./espace";

function Footer() {
  const [openEspace, setOpenEspace] = useState(false);
  const [openProfil, setOpenProfil] = useState(false);
  const handleClickEspace = () => {
    setOpenEspace(!openEspace);
  };
  const handleClickProfil = () => {
    setOpenProfil(!openProfil);
  };

  return (
    <div>
      <div>
        <AnimatePresence>
          {openEspace && (
            <motion.div
              exit={{ y: 280 }}
              initial={{ y: 280 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="h-2/3 bg-bleu_leger z-50 flex flex-col justify-center items-center"
            >
              <Espace />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <AnimatePresence>
          {openProfil && (
            <motion.div
              exit={{ y: 280 }}
              initial={{ y: 280 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="h-2/3 bg-bleu_leger z-50 flex flex-col justify-center items-center"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
              ipsam tenetur necessitatibus! Iusto ipsum reiciendis adipisci
              dolore pariatur corrupti sequi! Unde autem earum assumenda debitis
              libero laboriosam iure excepturi accusamus.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr className={openEspace || openProfil ? "hidden" : "bg-vert h-1"} />
      <div className="bg-bleu  z-0 relative flex items-center ">
        <div className="flex justify-around w-full">
          {openProfil ? (
            <div className="relative flex justify-center w-1/3">
              <Image
                src="/logo_enedis/picto_profil_white.svg"
                width={32}
                height={40}
                alt="logo du profil"
                className="relative z-20 "
                onClick={handleClickProfil}
              />
              <div className="h-10 bg-white w-full absolute top-0 left-1/2 transform -translate-x-1/2 z-10" />
            </div>
          ) : (
            <Image
              src="/logo_enedis/picto_profil_vert.svg"
              width={32}
              height={40}
              alt="logo du profil"
              onClick={handleClickProfil}
            />
          )}
          {openEspace ? (
            <div className="relative flex justify-center w-1/3 ">
              <Image
                src="/logo_enedis/picto_espace_white.svg"
                width={40}
                height={40}
                alt="logo carte des espaces"
                onClick={handleClickEspace}
                className="relative z-20 "
              />
              <div className="h-10 bg-white w-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 " />
            </div>
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
    </div>
  );
}

export default Footer;
