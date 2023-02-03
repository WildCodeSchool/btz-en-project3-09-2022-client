import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Espace from "./componentsFooter/Espace";
import Profil from "./componentsFooter/Profil";
import EspaceDescription from "./componentsFooter/EspaceDescription";
import CategorieDescription from "./componentsFooter/CategorieDescription";
import OpenEspaceDescription from "./componentsFooter/OpenEspaceDescription";
import OpenCategoryDescription from "./componentsFooter/OpenCategoryDescription";

function Footer() {
  const [openEspace, setOpenEspace] = useState(false);
  const [openProfil, setOpenProfil] = useState(false);
  const [openOrCloseEspaceDescription, setOpenEspaceDescription] =
    useState(false);
  const [openCategorieDescription, setOpenCategorieDescription] =
    useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpenEspace(false));
  useOnClickOutside(ref, () => setOpenProfil(false));
  useOnClickOutside(ref, () => setOpenCategorieDescription(false));
  useOnClickOutside(ref, () => setOpenEspaceDescription(false));

  const handleClickEspace = () => {
    if (openProfil) {
      setOpenProfil(false);
    }
    if (openOrCloseEspaceDescription) {
      setOpenEspaceDescription(false);
    }
    if (openCategorieDescription) {
      setOpenCategorieDescription(false);
    }
    setTimeout(() => setOpenEspace(!openEspace), 300);
  };

  const handleClickProfil = () => {
    if (openOrCloseEspaceDescription) {
      setOpenEspaceDescription(false);
    }
    if (openEspace) {
      setOpenEspace(false);
    }
    if (openCategorieDescription) {
      setOpenCategorieDescription(false);
    }
    setTimeout(() => setOpenProfil(!openProfil), 300);
  };
  const handleClickEspaceDescription = () => {
    if (openEspace) {
      setOpenEspace(false);
    }
    if (openProfil) {
      setOpenProfil(false);
    }
    setTimeout(
      () => setOpenEspaceDescription(!openOrCloseEspaceDescription),
      300
    );
  };

  const HandleClickCategorieDescription = () => {
    if (openEspace) {
      setOpenEspace(false);
    }
    if (openProfil) {
      setOpenProfil(false);
    }
    setTimeout(
      () => setOpenCategorieDescription(!openCategorieDescription),
      300
    );
  };

  return (
    <div>
      <div className="w-full block md:hidden">
        <div ref={ref}>
          <AnimatePresence>
            {openEspace && (
              <motion.div
                exit={{ y: 480 }}
                initial={{ y: 480 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
                className="h-2/3 bg-background-enedis z-50 flex flex-col justify-center items-center"
              >
                <Espace />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div ref={ref}>
          <AnimatePresence>
            {openProfil && (
              <motion.div
                exit={{ y: 480 }}
                initial={{ y: 480 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-background-enedis"
              >
                <Profil />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div ref={ref}>
          <AnimatePresence>
            {openOrCloseEspaceDescription && (
              <motion.div
                exit={{ y: 480 }}
                initial={{ y: 480 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
                className="h-2/3 bg-background-enedis z-50 flex flex-col justify-center items-center"
              >
                <EspaceDescription />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div ref={ref}>
          <AnimatePresence>
            {openCategorieDescription && (
              <motion.div
                exit={{ y: 280 }}
                initial={{ y: 280 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-2/3 bg-background-enedis z-50 flex flex-col justify-center items-center"
              >
                <CategorieDescription />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className={
            openEspace ||
            openProfil ||
            openOrCloseEspaceDescription ||
            openCategorieDescription
              ? "hidden"
              : "bg-green-enedis h-1"
          }
        />
        <div className="bg-blue-enedis  z-0 relative flex items-center h-16">
          <div className="flex justify-around w-full h-full ">
            <div
              className={`relative flex justify-center w-1/6 ${
                openProfil && "bg-background-enedis"
              }`}
            >
              {openProfil ? (
                <div className="relative flex justify-center">
                  <Image
                    src="/logo_enedis/picto_profil_white.svg"
                    width={40}
                    height={40}
                    alt="logo du profil"
                    className="relative z-20 "
                    onClick={handleClickProfil}
                  />
                </div>
              ) : (
                <div className="relative flex justify-center  w-full bg-blue-enedis">
                  <div className=" flex justify-center items-center">
                    <Image
                      src="/logo_enedis/picto_profil_vert.svg"
                      width={32}
                      height={40}
                      alt="logo du profil"
                      onClick={handleClickProfil}
                    />
                  </div>
                </div>
              )}
            </div>
            <div
              className={
                window.location.href.includes("space") &&
                !window.location.href.includes("category")
                  ? "relative flex justify-center w-1/6"
                  : "hidden"
              }
            >
              <OpenEspaceDescription
                openOrCloseEspaceDescription={openOrCloseEspaceDescription}
                handleClickEspaceDescription={handleClickEspaceDescription}
              />
            </div>

            <div
              className={
                window.location.href.includes("category")
                  ? "relative flex justify-center w-1/6"
                  : "hidden"
              }
            >
              <OpenCategoryDescription
                openCategorieDescription={openCategorieDescription}
                HandleClickCategorieDescription={
                  HandleClickCategorieDescription
                }
              />
            </div>
            <div
              className={`relative flex justify-center w-1/6 ${
                openEspace && "bg-background-enedis"
              }`}
            >
              {openEspace ? (
                <div className="relative flex justify-center">
                  <Image
                    src="/logo_enedis/picto_espace_white.svg"
                    width={44}
                    height={40}
                    alt="logo carte des espaces"
                    onClick={handleClickEspace}
                    className="relative z-20"
                  />
                  <div className="h-full bg-background-enedis w-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 " />
                </div>
              ) : (
                <div className="relative flex justify-center  w-full bg-blue-enedis">
                  <div className=" flex justify-center items-center">
                    <Image
                      src="/logo_enedis/picto_espace_vert.svg"
                      width={40}
                      height={40}
                      alt="logo carte des espaces"
                      onClick={handleClickEspace}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className=" w-1/6 flex justify-center items-center">
              <Image
                src="/logo_enedis/picto_notif_vert.svg"
                width={40}
                height={40}
                alt="logo des notifications"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
