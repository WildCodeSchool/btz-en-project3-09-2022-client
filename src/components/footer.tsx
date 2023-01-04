import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  const [openEspace, setOpenEspace] = useState(false);
  const handleClickEspace = () => {
    setOpenEspace(!openEspace);
  };

  return (
    <div>
      <div>
        {openEspace && (
          <div className="h-2/3 bg-slate-400 flex justify-center items-start p-4">
            <div className="bg-bleu w-2/6 rounded-full text-white flex justify-center py-2">
              Mes espaces
            </div>
          </div>
        )}
      </div>
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
          onClick={handleClickEspace}
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
    </div>
  );
}

export default Footer;
