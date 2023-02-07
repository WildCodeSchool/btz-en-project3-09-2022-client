import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../context/UserContext";
import { TTeam, TUser } from "../../types/main";

import { formatDate } from "../../utils/constants";

interface Props {
  user: TUser;
  id: string | undefined | string[];
  team: TTeam | undefined;
}

export default function PersonalInfos({ user, id, team }: Props) {
  const { user: userConnected } = useAuth();
  return (
    <div className="flex w-full lg:w-1/2 m-auto">
      <div className=" w-1/2 m-4 flex flex-col items-center">
        <Image
          src={user.imageUrl || "/profile_image.png"}
          width={126}
          height={126}
          alt="profil"
          className="w-[126px] h-[126px] rounded-[50%] my-[5%] object-cover"
        />
        {userConnected?.id === id && (
          <Link href="/profile/settings">
            <button
              type="button"
              className="  text-left px-2  w-[131px] rounded-full h-[53px] bg-green-enedis text-white-enedis text-mob-lg(CTA+input) flex justify-around items-center "
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
          </Link>
        )}
      </div>
      <div className=" space-y-2  w-1/2  text-left mt-8 ">
        <div className="flex flex-col space-y-2">
          <p className="font-bold text-[28px] ">{user.firstname}</p>
          <p className="font-bold text-[28px] truncate md:w-[200px]  h-10 pt-2">
            {user.lastname.toUpperCase()}
          </p>
        </div>
        <div className="flex ">
          <Image
            src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
            width={25}
            height={25}
            alt="picto enedis"
            className="mr-4 w-[25px] h-[25px]"
          />
          <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px]  text-mob-sm(textPost) lg:text-desk-lg(titlePubli+multiuse) ">
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
          <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px]  text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse)">
            {user.workLocation}
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
          <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px]  text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse) truncate ">
            {user.email}
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

          <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px] text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse)">
            {formatDate(new Date(user.birthday || "null"))}
          </p>
        </div>
      </div>
    </div>
  );
}
