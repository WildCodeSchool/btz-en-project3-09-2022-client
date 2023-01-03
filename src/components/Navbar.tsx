import React, { useState } from "react";
import logo from "../../public/assets/logo-enedis-share_blanc.png";
import pictoSearch from "../../public/assets/ENEDIS_PICTO_003_Search_BLANC_EXE.png";
import profilePicture from "../../public/assets/john-min.JPG";

function Navbar() {
  // display search bar
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const displaySearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  return (
    <div className="h-[64px] bg-bleu flex justify-center">
      <div className="w-[95%]  flex justify-between items-center">
        <img
          src={logo.src}
          alt="enedis-share-logo"
          className="max-w-[30%] min-w-[100px]"
        />
        <div className="flex justify-between min-w-[100px] ">
          <div className="flex flex-row-reverse  justify-around items-center ">
            <button
              type="button"
              className="bg-vert w-[45px] h-[45px] rounded-full flex justify-center items-center"
              onClick={displaySearchBar}
            >
              <img
                src={pictoSearch.src}
                alt="search-picto"
                className="w-[80%] h-[80%]"
              />
            </button>

            {isSearchBarOpen && (
              <input
                className="w-2/3 h-1/2 rounded-full text-center"
                placeholder="recherche.."
              />
            )}
          </div>
          <div className="bg-vert min-w-[45px] h-[45px] rounded-full flex justify-center items-center">
            <img
              src={profilePicture.src}
              alt="profile"
              className="rounded-[50%] h-[40px] w-[40px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
