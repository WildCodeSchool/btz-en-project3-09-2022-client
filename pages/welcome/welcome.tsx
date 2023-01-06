import Image from "next/image";
import React from "react";
import Welcome from "../../src/components/Welcome";

function welcome() {
  return (
    <div className="flex flex-col items-center">
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
        <Welcome />
      </div>
      <Image
        src="/assets/bienvenue_threads_mobile.png"
        width={300}
        height={300}
        quality={100}
        alt="threads"
        className="relative flex top-80 md:top-[450px]"
      />
    </div>
  );
}

export default welcome;
