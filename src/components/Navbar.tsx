import React, { useState } from "react";
import logo from "../../public/assets/logo-enedis-share_blanc.png";
import pictoSearch from "../../public/assets/ENEDIS_PICTO_003_Search_BLANC_EXE.png";
import profilePicture from "../../public/assets/john-min.JPG";
import useModal from "./modal/useModal";
import Modal from "./modal/Modal";

function Navbar() {
  // display search bar
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const displaySearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  // Modal
  const { isShowing, toggle } = useModal();

  return (
    <div className="h-[100px] bg-bleu flex justify-center relative">
      <div className="w-[95%]  flex justify-between items-center">
        <img
          src={logo.src}
          alt="enedis-share-logo"
          className="max-w-[10%] min-w-[200px]"
        />
        <div className="flex justify-between min-w-[100px] ">
          <div className=" flex flex-row-reverse  justify-around items-center ">
            {isSearchBarOpen && (
              <input
                className="absolute right-[75px] md:right-[85px] lg:right-[95px] xl:right-[105px] w-1/3 h-[45px] rounded-full text-center "
                placeholder="recherche..."
              />
            )}
            <button
              type="button"
              className="bg-vert w-[45px] h-[45px] rounded-full flex justify-center items-center z-10"
              onClick={displaySearchBar}
            >
              <img
                src={pictoSearch.src}
                alt="search-picto"
                className="w-[80%] h-[80%]"
              />
            </button>
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
  );
}

export default Navbar;
