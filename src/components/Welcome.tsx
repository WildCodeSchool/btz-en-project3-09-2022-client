import Image from "next/image";
import React from "react";

function Welcome() {
  return (
    <div className="bg-blue-enedis rounded-connection-bloc space-y-3 mx-10 md:mx-32 lg:mx-20">
      <div className="flex flex-col items-center lg:grid lg:grid-row-3 lg:grid-flow-col lg:items-start">
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
          className="hidden lg:grid lg:col-span-2 lg:pt-10"
        />
        <div className="hidden font-enedis text-white-enedis font-bold text-mob-4xl(welcomeConnect) lg:grid lg:row-span-2 lg:col-span-2">
          Bienvenue !
        </div>
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
      <div className="font-enedis text-white-enedis font-bold text-mob-4xl(welcomeConnect) pt-14 pb-36 lg:hidden">
        Bienvenue !
      </div>
    </div>
  );
}

export default Welcome;
