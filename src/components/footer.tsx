import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Espace from "./espace";
import Profil from "./profil";
import EspaceDescription from "./espaceDescription";

function Footer() {
  const [openEspace, setOpenEspace] = useState(false);
  const [openProfil, setOpenProfil] = useState(false);
  const [openEspaceDescription, setOpenEspaceDescription] = useState(false);

  const handleClickEspace = () => {
    if (openProfil) {
      setOpenProfil(false);
    }
    if (openEspaceDescription) {
      setOpenEspaceDescription(false);
    }
    setTimeout(() => setOpenEspace(!openEspace), 500);
  };
  const handleClickProfil = () => {
    if (openEspaceDescription) {
      setOpenEspaceDescription(false);
    }
    if (openEspace) {
      setOpenEspace(false);
    }
    setTimeout(() => setOpenProfil(!openProfil), 500);
  };
  const handleClickEspaceDescription = () => {
    if (openEspace) {
      setOpenEspace(false);
    }
    if (openProfil) {
      setOpenProfil(false);
    }
    setTimeout(() => setOpenEspaceDescription(!openEspaceDescription), 500);
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
              transition={{ duration: 0.5 }}
              className="h-2/3 bg-background-enedis z-50 flex flex-col justify-center items-center"
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
              transition={{ duration: 0.5 }}
              className="bg-background-enedis "
            >
              <Profil />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <AnimatePresence>
          {openEspaceDescription && (
            <motion.div
              exit={{ y: 280 }}
              initial={{ y: 280 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-2/3 bg-background-enedis z-50 flex flex-col justify-center items-center"
            >
              <EspaceDescription />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={
          openEspace || openProfil || openEspaceDescription
            ? "hidden"
            : "bg-green-enedis h-1"
        }
      />
      <div className="bg-blue-enedis  z-0 relative flex items-center h-16">
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
              <div className="h-10 bg-white-enedis w-full absolute top-0 left-1/2 transform -translate-x-1/2 z-10" />
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

          {openEspaceDescription ? (
            <div className="relative flex justify-center w-1/3">
              <Image
                src="/logo_enedis/PictoInfoBlue.svg"
                width={30}
                height={40}
                alt="logo des notifications"
                className="relative z-20 "
                onClick={handleClickEspaceDescription}
              />
              <div className="h-10 bg-white-enedis w-full absolute top-0 left-1/2 transform -translate-x-1/2 z-10" />
            </div>
          ) : (
            <Image
              src="/logo_enedis/PictoInfoGreen.svg"
              width={30}
              height={40}
              alt="logo des notifications"
              onClick={handleClickEspaceDescription}
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
              <div className="h-10 bg-white-enedis w-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 " />
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
