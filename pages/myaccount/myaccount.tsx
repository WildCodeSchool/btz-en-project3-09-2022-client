import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useAuth } from "../../src/context/UserContext";
import { formatDate } from "../../src/utils/constants";
import {
  categoryFetcher,
  teamFetcher,
  userFetcher,
} from "../../src/utils/fetcher";

function myaccount() {
  const { user } = useAuth();

  if (!user) {
    return <p>No user</p>;
  }

  const {
    data: team,
    isLoading,
    error,
  } = useQuery(["teams", `user-${user?.teamId}`], () =>
    teamFetcher.getOne(`${user?.teamId}`)
  );

  const { data: usersInMyTeam } = useQuery(
    ["users", `team-${user?.teamId}`],
    () => userFetcher.getAllMembersOneTeam(user?.teamId, user?.id)
  );

  const { data: myCategories } = useQuery(
    ["categories", `user-${user?.teamId}`],
    () => categoryFetcher.getAllByUser(user?.id)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>No error</p>;
  }

  return (
    <div className="bg-background-enedis w-[95%] m-auto mt-2 pb-10  ">
      <div className="flex ">
        <div className=" w-1/2 m-4">
          <img
            src={user?.imageUrl || "/profile_image.png"}
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
            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px] cursor-not-allowed text-mob-xs(textPost) ">
              {team?.name}
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
            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px] cursor-not-allowed text-mob-xs(textPost) ">
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
            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px] cursor-not-allowed text-mob-xs(textPost) ">
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

            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px] cursor-not-allowed text-mob-xs(textPost) ">
              {formatDate(user?.birthday as Date)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
          <h3 className="mb-2">Mon équipe</h3>
          <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
          <ul className="mt-5">
            {usersInMyTeam?.map((item) => (
              <li className="flex items-center" key={item.id}>
                <Image
                  src={item.imageUrl || "/image_profile.png"}
                  width={30}
                  height={30}
                  alt="profile"
                  className="w-[30px] h-[30px] rounded-[50%] my-[4px] mr-2 object-cover"
                />
                <p className="border border-blue-enedis rounded-full h-[30px] w-fit pt-1 px-2 truncate ">
                  {item.firstname} {item.lastname}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
          <h3 className="mb-2">Mes catégories</h3>
          <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
          <ul className="mt-5 space-y-2">
            {myCategories?.map((category) =>
              category.ownerId === user.id ? (
                <div className="flex ">
                  <li
                    className="border border-blue-enedis rounded-full h-[30px] w-fit pt-1 px-2  "
                    key={category.id}
                  >
                    {category.name}
                  </li>

                  <Image
                    src="/assets/Group 87.png"
                    width={30}
                    height={30}
                    alt="owner"
                    className="h-[30px] w-[30px] ml-10"
                  />
                </div>
              ) : (
                <li
                  className="border border-blue-enedis rounded-full h-[30px] w-fit pt-1 px-2 truncate "
                  key={category.id}
                >
                  {category.name}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className=" flex flex-col items-center pt-4 pb-4a w-full">
        <h3 className="mb-2">Mon activité</h3>
        <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
      </div>
      <div className=" flex flex-col items-center pt-4 pb-4a w-full">
        <h3 className="mb-2">Mes dernières publications</h3>
        <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
        <div>MES DERNIERES PUBLICATIONS</div>
      </div>
    </div>
  );
}

export default myaccount;
