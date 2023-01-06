import Image from "next/image";
import React from "react";
import SignIn from "../../src/components/Auth/SignIn";

function signIn() {
  return (
    <div className="flex flex-col">
      <Image
        src="/assets/photo_connexion_mobile.png"
        width={1000}
        height={10}
        quality={100}
        alt="an electrican man working in the background"
        className="sm:hidden"
      />
      <Image
        src="/assets/photo_connexion_desktop.jpg"
        width={10000}
        height={1}
        quality={100}
        alt="an electrican man working in the background"
        className="hidden sm:flex md:absolute"
      />
      <div className="absolute z-50 flex justify-center items-center top-28 md:justify-start md:left-36">
        <SignIn />
      </div>
      <Image
        src="/assets/threads.png"
        width={1000}
        height={100}
        quality={100}
        alt="decoration threads"
        className="pt-32 md:hidden"
      />
      <Image
        src="/assets/threads_desktop.png"
        width={10000}
        height={100}
        quality={100}
        alt="decoration threads"
        className="hidden md:flex z-0 relative md:top-60"
      />
    </div>
  );
}

export default signIn;
