import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import { siteFetcher } from "../../utils/fetcher";
import { useAuth } from "../../context/UserContext";

function HeaderHP() {
  const { user } = useAuth();

  const {
    isLoading,
    error,
    data: dataSite,
  } = useQuery(
    ["Site", user?.id],
    () => user && siteFetcher.getSitesByMember(user.id)
  );

  if (isLoading || !dataSite) return <div>En chargement</div>;
  if (error) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-full relative z-0 h-[142px] md:h-[210px]">
      <div className="w-full h-full bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-20" />
      <Image
        alt={dataSite[0].name}
        src={dataSite[0].imageUrl}
        fill
        className="object-cover relative z-10 min-h-full"
      />
      <div className="absolute z-30 centered-absolute w-full font-enedis text-white-enedis">
        <h1 className="text-mob-3xl(welcome+name) font-black md:text-desk-4xl(welcome)">
          Bienvenue
        </h1>
        <h1 className="text-mob-xl(headers+titles) font-medium md:text-desk-3xl(header+name)">
          sur Enedis Share {dataSite[0].name} !
        </h1>
      </div>
    </div>
  );
}
export default HeaderHP;
