/* eslint-disable no-unneeded-ternary */
import Image from "next/image";
import React from "react";
import { createPortal } from "react-dom";

interface IProps {
  isWelcomeScreen: boolean;
  setIsWelcomeScreen: (value: boolean) => void;
}

function Welcome({ isWelcomeScreen, setIsWelcomeScreen }: IProps) {
  const setIsNewUser = (value: string) => {
    localStorage.setItem("isNewCheck", value);
    setIsWelcomeScreen(true);
  };

  return !isWelcomeScreen
    ? createPortal(
        <div className="flex flex-col h-screen w-screen fixed top-0 left-0 z-[100] bg-white-enedis items-center">
          {/* background images: mobile & desktop */}
          <Image
            src="/assets/photo_connexion_mobile.png"
            width={1000}
            height={10}
            quality={100}
            alt="an electrican man working in the background"
            className="md:hidden relative max-h-[600px]"
          />
          <Image
            src="/assets/photo_bienvenue_desktop.png"
            width={10000}
            height={1}
            quality={100}
            alt="an man working on a board"
            className="hidden relative md:flex"
          />
          <div className="absolute top-14 md:top-24 h-fit">
            <div className="bg-blue-enedis rounded-connection-bloc space-y-3 mx-8 max-w-[430px] xs:mx-12 sm:mx-18 md:mx-32">
              <div className="flex flex-col items-center ">
                {/* desktop and mobile version */}
                <Image
                  src="/assets/logo-enedis-share_blanc.png"
                  width={1000}
                  height={1000}
                  quality={100}
                  alt="logo enedis share"
                  className="w-3/4"
                />
                <Image
                  src="/assets/bienvenue_mobile.png"
                  width={220}
                  height={220}
                  quality={100}
                  alt="welcome image"
                  className="w-1/2 md:w-5/12"
                />
              </div>
              <div className="font-enedis text-white-enedis font-bold text-desk-3xl(header+name) xs:text-mob-4xl(welcomeConnect) pt-4 pb-10 flex flex-col items-center">
                Bienvenue !
                <button
                  onClick={() => setIsNewUser("false")}
                  type="button"
                  className="bg-white-enedis relative z-[80] w-fit text-blue-enedis rounded-full px-5 py-3 mt-4 md:px-10"
                >
                  Accéder au site
                  <div className="absolute w-[150%] h-fit centered-x-absolute top-12">
                    <Image
                      src="/assets/bienvenue_threads_mobile.png"
                      width={300}
                      height={300}
                      quality={100}
                      alt="threads"
                      className=""
                    />
                    <Image
                      src="/assets/bienvenue_threads_desktop.png"
                      width={300}
                      height={300}
                      quality={100}
                      alt="threads"
                      className="relative hidden top-80"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}

export default Welcome;
