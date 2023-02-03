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
        className="xs:hidden"
      />
      <Image
        src="/assets/photo_connexion_desktop.jpg"
        width={10000}
        height={1}
        quality={100}
        alt="an electrican man working in the background"
        className="hidden xs:flex xs:absolute"
      />
      <div className="absolute z-50 flex justify-center items-center top-12 xs:top-20 md:justify-start md:left-36">
        <SignIn />
      </div>
      <Image
        src="/assets/threads.png"
        width={1000}
        height={100}
        quality={100}
        alt="decoration threads"
        className="mt-10 xs:hidden"
      />
      <Image
        src="/assets/threads_desktop.png"
        width={10000}
        height={100}
        quality={100}
        alt="decoration threads"
        className="hidden xs:flex z-0 relative xs:top-60"
      />
    </div>
  );
}

export default signIn;
