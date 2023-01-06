import Image from "next/image";
import React from "react";

function Welcome() {
  return (
    <div className="bg-blue-enedis flex flex-col items-center rounded-connection-bloc space-y-3 mx-10">
      <Image
        src="/assets/logo-enedis-share_blanc.png"
        width={1000}
        height={1000}
        quality={100}
        alt="logo enedis share"
      />
      <Image
        src="/assets/bienvenue_mobile.png"
        width={220}
        height={220}
        quality={100}
        alt="welcome image"
      />
      <div className="font-enedis text-white-enedis font-bold text-mob-4xl(welcomeConnect) pt-14 pb-36">
        Bienvenue !
      </div>
    </div>
  );
}

export default Welcome;
