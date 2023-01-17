import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useAuth } from "../../src/context/UserContext";
import { formatDate } from "../../src/utils/constants";
import { teamFetcher } from "../../src/utils/fetcher";

function myaccount() {
  const { user } = useAuth();

  const { data: team, isLoading } = useQuery(
    ["teams", `user-${user?.teamId}`],
    () => teamFetcher.getOne(`${user?.teamId}`)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-background-enedis w-[95%] m-auto mt-2 pb-10  ">
      <div className="flex ">
        <div className=" w-1/2 m-4">
          <img
            src={user?.imageUrl}
            alt="profil"
            className="w-[126px] h-[126px] rounded-[50%] my-[5%] object-cover"
          />
          <button
            type="button"
            className="  text-left px-2  w-[131px] rounded-full h-[53px] bg-green-enedis text-white-enedis text-mob-md(CTA+input) flex justify-around items-center "
          >
            <Image
              src="/assets/picto-set 1.png"
              width={25}
              height={25}
              alt="picto enedis"
              className="w-[25px] h-[25px]"
            />
            Modifier
            <br /> mes infos
          </button>
        </div>
        <div className=" space-y-2  w-1/2  text-left mt-8 ">
          <p className="font-bold text-[32px] pb-2">{user?.firstname}</p>
          <p className="font-bold text-[32px]  pb-4">
            {user?.lastname.toUpperCase()}
          </p>
          <div className="flex ">
            <Image
              src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
              width={25}
              height={25}
              alt="picto enedis"
              className="mr-4 w-[25px] h-[25px]"
            />
            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[32px] cursor-not-allowed text-mob-xs(textPost) ">
              {team.name}
            </p>
          </div>
          <div className="flex ">
            <Image
              src="/assets/ENEDIS_PICTO_006_Geolocalisation_BLEU_RVB_EXE 1.png"
              width={25}
              height={25}
              alt="picto enedis"
              className="mr-4 w-[25px] h-[25px]"
            />
            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[32px] cursor-not-allowed text-mob-xs(textPost) ">
              {user?.workLocation}
            </p>
          </div>
          <div className=" flex">
            <Image
              src="/assets/ENEDIS_PICTO_018_Contact_BLEU_RVB_EXE 1.png"
              width={25}
              height={25}
              alt="picto enedis"
              className="mr-4 w-[25px] h-[25px]"
            />
            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[32px] cursor-not-allowed text-mob-xs(textPost) ">
              {user?.email}
            </p>
          </div>
          <div className=" flex">
            <Image
              src="/assets/picto-birthday 1.png"
              width={25}
              height={25}
              alt="picto enedis"
              className="mr-4 w-[25px] h-[25px]"
            />

            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[32px] cursor-not-allowed text-mob-xs(textPost) ">
              {formatDate(user?.birthday)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
          <h3 className="mb-2">Ma connexion</h3>
          <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
        </div>
        <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
          <h3 className="mb-2">Mes catégories</h3>
          <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
        </div>
      </div>
    </div>
  );
}

export default myaccount;
