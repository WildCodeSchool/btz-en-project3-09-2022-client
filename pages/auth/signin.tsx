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
        alt="an electrican man working in the background"
      />
      <div className="absolute flex justify-center items-center top-28">
        <SignIn />
      </div>
      <Image
        src="/assets/threads.png"
        width={1000}
        height={100}
        alt="decoration threads"
        className="pt-32"
      />
    </div>
  );
}

export default signIn;
