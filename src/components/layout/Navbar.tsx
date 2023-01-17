import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useWindowSize } from "usehooks-ts";
import { useAuth } from "../../context/UserContext";

import useModal from "../modal/useModal";
import Modal from "../modal/Modal";
import SearchBar from "./SearchBar";

function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
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
      {/* Modal component */}
      <Modal isShowing={isShowing} hide={toggle}>
        <div className=" space-y-3">
          <button
            type="button"
            className="text-white-enedis"
            onClick={() => router.push("/myaccount")}
          >
            Mon profil
          </button>
          <p className="text-white-enedis">Paramètres</p>
          <p className="text-white-enedis">Aide</p>
          <p className="text-white-enedis">Me déconnecter</p>
        </div>
      </Modal>

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
            <div className="flex justify-between min-w-[100px]  ">
              <div className=" flex flex-row-reverse  justify-around items-center ">
                {isSearchBarOpen ? (
                  <SearchBar
                    width={width}
                    isSearchBarOpen={isSearchBarOpen}
                    setIsSearchBarOpen={setIsSearchBarOpen}
                  />
                ) : (
                  <div className="bg-white-enedis  w-[45px] h-[45px] rounded-full flex justify-center items-center">
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
                <button type="button" onClick={toggle}>
                  <Image
                    src={user?.imageUrl}
                    width={1000}
                    height={1000}
                    alt="profile"
                    className="rounded-[50%] h-[40px] w-[40px] object-cover"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-2/3 flex justify-between ">
              <SearchBar
                width={width}
                isSearchBarOpen={isSearchBarOpen}
                setIsSearchBarOpen={setIsSearchBarOpen}
              />

              <button
                type="button"
                className="bg-green-enedis text-desk-lg(CTA+input) font-bold text-white-enedis rounded-full w-[140px] h-[40px] absolute right-8 top-4"
              >
                Je publie
              </button>
            </div>
          )}
        </div>
      </div>
      {width > 768 && (
        <div className="px-4 min-w-[180px] m-auto flex justify-between items-center h-[70px]">
          <Image
            src={user?.imageUrl || "/profile_image.png"}
            width={1000}
            height={1000}
            alt="profile"
            className="rounded-[60%] h-[40px] w-[40px] object-cover"
          />

          <p className="font-enedis font-bold text-desk-xl(section)">
            {user?.firstname}
            <br />
            {user?.lastname}
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
