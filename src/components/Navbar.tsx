import React, { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import Image from "next/image";
import useModal from "./modal/useModal";
import Modal from "./modal/Modal";

function Navbar() {
  // Window size
  const { width } = useWindowSize();

  // display search bar
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const displaySearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  // Modal
  const { isShowing, toggle } = useModal();

  return (
    <div className="w-full flex justify-between ">
      <div className="h-[70px] bg-blue-enedis flex justify-center relative md:w-5/6 md:rounded-r-full  w-full">
        <div className="w-[95%] flex justify-between items-center">
          <Image
            src="/assets/logo-enedis-share_blanc.png"
            width={1000}
            height={1000}
            quality={100}
            alt="enedis-share-logo"
            className=" max-w-[10%] min-w-[200px] "
          />
          {width < 768 ? (
            <div className="flex justify-between min-w-[100px] ">
              <div className=" flex flex-row-reverse  justify-around items-center ">
                {isSearchBarOpen && width > 380 && (
                  <input
                    className="absolute right-[75px]   h-[45px] rounded-full text-center w-1/3 placeholder "
                    placeholder="Rechercher..."
                  />
                )}
                {width > 380 && (
                  <div className="bg-white-enedis w-[45px] h-[45px] rounded-full flex justify-center items-center">
                    <button
                      type="button"
                      className="bg-green-enedis w-[37px] h-[37px] rounded-full flex justify-center items-center z-10 "
                      onClick={displaySearchBar}
                    >
                      <Image
                        src="/assets/ENEDIS_PICTO_003_Search_BLANC_EXE.png"
                        width={1000}
                        height={1000}
                        alt="search-picto"
                        className="w-[80%] h-[80%]"
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-green-enedis min-w-[45px] h-[45px] rounded-full flex justify-center items-center">
                {/* <Image
              src="/assets/john-min.JPG"
              width={80}
              height={80}
              alt="profile"
              className="rounded-[50%] object-cover"
            /> */}
                <button type="button" onClick={toggle}>
                  <Image
                    src="/assets/john-min.JPG"
                    width={1000}
                    height={1000}
                    alt="profile"
                    className="rounded-[50%] h-[40px] w-[40px] object-cover"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-2/3 flex justify-between">
              <div className="relative  min-w-[50%] flex justify-between items-center  ">
                <input
                  className="w-[86%] h-[40px] rounded-full text-center "
                  placeholder="Rechercher sur Enedis Share..."
                />

                <Image
                  src="/assets/ENEDIS_PICTO_003_Search_BLANC_EXE.png"
                  width={1000}
                  height={1000}
                  alt="search-picto"
                  className=" absolute -right-3  w-[45px] h-[45px] rounded-full flex justify-center items-center z-10 "
                />
              </div>
              <button
                type="button"
                className="bg-green-enedis text-desk-lg(CTA+input) font-bold text-white-enedis rounded-full w-[140px] h-[40px] absolute right-8 top-4"
              >
                Je publie
              </button>
            </div>
          )}
        </div>
        <div className="absolute">
          <Modal isShowing={isShowing} hide={toggle}>
            <div className="space-y-4 text-left ">
              <p className="text-white-enedis">Mon profil</p>
              <p className="text-white-enedis">Paramètres</p>
              <p className="text-white-enedis">Aide</p>
              <p className="text-white-enedis">Me déconnecter</p>
            </div>
          </Modal>
        </div>
      </div>
      {width > 768 && (
        <div className="px-4 min-w-[180px] m-auto flex justify-between items-center h-[70px]">
          <Image
            src="/assets/john-min.JPG"
            width={1000}
            height={1000}
            alt="profile"
            className="rounded-[60%] h-[40px] w-[40px] object-cover"
          />

          <p className="font-enedis font-bold text-desk-xl(section)">
            John <br />
            DOE
          </p>
          <button type="button" onClick={toggle}>
            <Image
              src="/assets/Polygon10.png"
              width={20}
              height={20}
              alt="profile"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
