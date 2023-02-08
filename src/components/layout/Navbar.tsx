import React, { useRef, useState } from "react";
import Image from "next/image";
import { useWindowSize } from "usehooks-ts";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useOnClickOutside from "@jidayyy/useonclickoutside";
import { useAuth } from "../../context/UserContext";

import useModal from "../modal/useModal";
import Modal from "../modal/Modal";
import SearchBar from "./SearchBar";
import { useModalContext } from "../../context/ModalContext";
import { userFetcher } from "../../utils/fetcher";
import Loader from "../structureShared/Loader";

function Navbar() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <div> Vous devez vous connecter pour y accéder</div>;
  }

  const modalContext = useModalContext();
  // Window size
  const { width } = useWindowSize();

  // display search bar
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const displaySearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  // Modal
  const { isShowing, toggle } = useModal();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => toggle());

  const handleSearchBar = () => {
    setTimeout(() => {
      toggle();
    }, 1000);
  };

  const { data: dataFreshUser, isLoading: isLoadingProfilePic } = useQuery(
    ["freshProfilePic", user.id],
    () => userFetcher.getOne(user.id)
  );

  if (isLoadingProfilePic || !dataFreshUser) {
    return <Loader />;
  }

  const { imageUrl: freshImageUrl } = dataFreshUser;

  const menu: {
    text: string;
    link: string;
    action: () => void;
  }[] = [
    {
      text: "Mon profil",
      link: `/profile/${user.id}`,
      action: handleSearchBar,
    },
    { text: "Paramètres", link: `/profile/settings`, action: handleSearchBar },
    { text: "Aide", link: "", action: handleSearchBar },
    { text: "Me déconnecter", link: `/auth/sigin`, action: handleSearchBar },
  ];

  return (
    <div className="w-full flex justify-between ">
      {/* Modal component */}
      <Modal isShowing={isShowing} hide={toggle}>
        <div className="flex-x-center space-y-3" ref={ref}>
          {menu.map((item) => (
            <Link href={item.link} key={item.link}>
              <button
                type="button"
                className={`text-white-enedis ${
                  item.text === "Mon profil" ? "font-bold" : "font-regular"
                }`}
                onClick={item.text === "Me déconnecter" ? signOut : item.action}
              >
                {item.text}
              </button>
            </Link>
          ))}
        </div>
      </Modal>

      <div className="h-[70px] bg-blue-enedis flex justify-center relative md:w-5/6 md:rounded-r-full  w-full">
        <div className="w-[95%] flex justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/logo-enedis-share_blanc.png"
              fill
              quality={100}
              alt="enedis-share-logo"
              className=" max-w-[10%] min-w-[200px] object-cover"
            />
          </Link>
          {width < 768 ? (
            <div className="flex justify-between min-w-[100px]  ">
              <div className=" flex flex-row-reverse  justify-around items-center ">
                {isSearchBarOpen ? (
                  <SearchBar width={width} />
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
                    src={freshImageUrl || "/profile_image.svg"}
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
              <SearchBar width={width} />

              <button
                type="button"
                onClick={modalContext?.handleOpen}
                className="bg-green-enedis text-desk-lg(CTA+input) font-bold text-white-enedis rounded-full w-[120px] h-[40px] absolute right-8 top-4"
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
            src={freshImageUrl || "/profile_image.svg"}
            width={1000}
            height={1000}
            alt="profile"
            className="rounded-[60%] h-[40px] w-[40px] object-cover"
          />

          <p className="font-enedis font-bold text-desk-md(titlePubli+multiuse) mx-2">
            {user.firstname}
            <br />
            {user.lastname.toUpperCase()}
          </p>
          <button
            type="button"
            onClick={toggle}
            className="w-4 h-3 min-w-[16px] min-h-[12px] relative"
          >
            <Image
              src="/assets/Polygon10.png"
              fill
              alt="icone triangle"
              className={`${!isShowing && "rotate-90"} object-fill`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
