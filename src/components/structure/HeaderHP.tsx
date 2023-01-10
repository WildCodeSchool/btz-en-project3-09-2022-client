import Image from "next/image";
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { TSite } from "../../types/main";

function HeaderHP() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const getDataSite = async () => {
    const { data } = await axios.get<TSite>(
      `${baseUrl}/sites/c91e5eee-3ba0-4efb-9352-6c4077e7670c`
    );
    return data;
  };

  const {
    isLoading,
    error,
    data: dataSite,
  } = useQuery("getDataSite", getDataSite);

  if (isLoading || !dataSite) return <div>En chargement</div>;
  if (error) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-full relative h-[142px] md:h-[210px]">
      <div className="w-full h-full bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-20" />
      <Image
        alt={dataSite.name}
        src={dataSite.imageUrl}
        fill
        className="object-cover relative z-10 min-h-full"
      />
      <div className="absolute z-30 centered-absolute w-full font-enedis text-white-enedis">
        <h1 className="text-mob-3xl(welcome+name) font-black md:text-desk-4xl(welcome)">
          Bienvenue
        </h1>
        <h1 className="text-mob-xl(headers+titles) font-medium md:text-desk-3xl(header+name)">
          sur Enedis Share {dataSite.name} !
        </h1>
      </div>
    </div>
  );
}
export default HeaderHP;
