import React from "react";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div className="bg-bleu flex justify-around p-1 w-full">
      <Link href="/">
        <Image
          src="/logo_enedis/enedis-home.png"
          width={75}
          height={75}
          alt="logo homepage"
        />
      </Link>

      <Image
        src="/logo_enedis/enedis-espace.png"
        width={75}
        height={75}
        alt="logo carte des espaces"
      />
      <Image
        src="/logo_enedis/enedis-category.png"
        width={75}
        height={75}
        alt="logo choix categories"
      />
      <Image
        src="/logo_enedis/enedis-notifications.png"
        width={75}
        height={75}
        alt="logo des notifications"
      />
    </div>
  );
}

export default Footer;
