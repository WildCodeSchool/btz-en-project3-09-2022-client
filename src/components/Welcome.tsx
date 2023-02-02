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
            className="md:hidden relative"
          />
          <Image
            src="/assets/photo_bienvenue_desktop.png"
            width={10000}
            height={1}
            quality={100}
            alt="an man working on a board"
            className="hidden relative md:flex"
          />
          <div className="absolute top-28">
            <div className="bg-blue-enedis rounded-connection-bloc space-y-3 mx-10 md:mx-32 lg:mx-20">
              <div className="flex flex-col items-center lg:grid lg:grid-row-3 lg:grid-flow-col lg:items-start">
                {/* desktop version */}
                <Image
                  src="/assets/bienvenue_mobile.png"
                  width={500}
                  height={500}
                  quality={100}
                  alt="welcome image"
                  className="hidden lg:grid lg:row-span-3 lg:pt-36 lg:pl-10"
                />
                <Image
                  src="/assets/logo-enedis-share_blanc_lg.png"
                  width={500}
                  height={500}
                  quality={100}
                  alt="logo enedis share"
                  className="hidden lg:grid lg:col-span-2"
                />
                <div className="hidden font-enedis text-white-enedis font-bold text-mob-4xl(welcomeConnect) lg:flex lg:flex-col lg:justify-center lg:align-middle lg:items-center lg:col-span-2">
                  Bienvenue !
                  <button
                    onClick={() => setIsNewUser("false")}
                    type="button"
                    className="bg-white-enedis w-1/2 text-blue-enedis rounded-full px-2 py-2 mt-4"
                  >
                    Accéder au site
                  </button>
                </div>
                {/* mobile version */}
                <Image
                  src="/assets/logo-enedis-share_blanc.png"
                  width={1000}
                  height={1000}
                  quality={100}
                  alt="logo enedis share"
                  className="md:w-2/3 lg:hidden"
                />
                <Image
                  src="/assets/bienvenue_mobile.png"
                  width={220}
                  height={220}
                  quality={100}
                  alt="welcome image"
                  className="md:w-1/3 lg:hidden"
                />
              </div>
              <div className="font-enedis text-white-enedis font-bold text-mob-4xl(welcomeConnect) pt-4 pb-36 flex flex-col items-center lg:hidden">
                Bienvenue !
                <button
                  onClick={() => setIsNewUser("false")}
                  type="button"
                  className="bg-white-enedis w-1/2 text-blue-enedis rounded-full px-2 py-2 mt-4"
                >
                  Accéder au site
                </button>
              </div>
            </div>
          </div>
          <Image
            src="/assets/bienvenue_threads_mobile.png"
            width={300}
            height={300}
            quality={100}
            alt="threads"
            className="relative flex top-80 md:top-[450px] lg:hidden"
          />
          <Image
            src="/assets/bienvenue_threads_desktop.png"
            width={300}
            height={300}
            quality={100}
            alt="threads"
            className="relative hidden top-80 lg:flex lg:top-[250px] lg:left-56 xl:top-[150px] xl:left-60"
          />
        </div>,
        document.body
      )
    : null;
}

export default Welcome;
