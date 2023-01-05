import React, { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import Image from "next/image";
import logo from "../../public/assets/logo-enedis-share_blanc.png";
import pictoSearch from "../../public/assets/ENEDIS_PICTO_003_Search_BLANC_EXE.png";
import profilePicture from "../../public/assets/john-min.JPG";
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
    <div className="w-full flex justify-between items-center">
      <div className="h-[100px] bg-bleu flex justify-center relative md:w-3/4 md:rounded-r-full  w-full">
        <div className="w-[95%]  flex justify-between items-center">
          <img
            src={logo.src}
            alt="enedis-share-logo"
            className=" max-w-[10%] min-w-[200px] "
          />
          {width < 768 ? (
            <div className="flex justify-between min-w-[100px] ">
              <div className=" flex flex-row-reverse  justify-around items-center ">
                {isSearchBarOpen && width > 380 && (
                  <input
                    className="absolute right-[75px] md:right-[85px] lg:right-[95px] xl:right-[105px]  h-[45px] rounded-full text-center w-1/3  "
                    placeholder="Rechercher sur Enedis Share..."
                  />
                )}
                {width > 380 && (
                  <button
                    type="button"
                    className="bg-vert w-[45px] h-[45px] rounded-full flex justify-center items-center z-10 "
                    onClick={displaySearchBar}
                  >
                    <img
                      src={pictoSearch.src}
                      alt="search-picto"
                      className="w-[80%] h-[80%]"
                    />
                  </button>
                )}
              </div>
              <div className="bg-vert min-w-[45px] h-[45px] rounded-full flex justify-center items-center">
                {/* <Image
              src="/assets/john-min.JPG"
              width={80}
              height={80}
              alt="profile"
              className="rounded-[50%] object-cover"
            /> */}
                <button type="button" onClick={toggle}>
                  <img
                    src={profilePicture.src}
                    alt="profile"
                    className="rounded-[50%] h-[40px] w-[40px] object-cover"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className=" w-full flex justify-around">
              <div className=" min-w-[50%] flex justify-between items-center relative ">
                {isSearchBarOpen && (
                  <input
                    className="w-[86%] h-[40px] rounded-full text-center "
                    placeholder="Rechercher sur Enedis Share..."
                  />
                )}
                <button
                  type="button"
                  className="absolute right-0   w-[45px] h-[45px] rounded-full flex justify-center items-center z-10 "
                  onClick={displaySearchBar}
                >
                  <img
                    src={pictoSearch.src}
                    alt="search-picto"
                    className="w-[80%] h-[80%]"
                  />
                </button>
              </div>
              <button
                type="button"
                className="bg-vert text-white rounded-full w-[200px] h-[60px]"
              >
                Je publie
              </button>
            </div>
          )}
        </div>
        <div className="absolute">
          <Modal isShowing={isShowing} hide={toggle}>
            <div className="space-y-2 ">
              <p className="text-white">Mon profil</p>
              <p className="text-white">Paramètres</p>
              <p className="text-white">Aide</p>
              <p className="text-white">Me déconnecter</p>
            </div>
          </Modal>
        </div>
      </div>
      {width > 768 && (
        <div className="max-w-[10%] min-w-[160px] m-auto flex justify-between items-center h-[100px]">
          <img
            src={profilePicture.src}
            alt="profile"
            className="rounded-[60%] h-[60px] w-[60px] object-cover"
          />

          <p>
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
