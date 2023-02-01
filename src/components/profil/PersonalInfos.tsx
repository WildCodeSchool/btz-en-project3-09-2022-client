import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TTeam, TUser } from "../../types/main";
// eslint-disable-next-line import/no-named-as-default
import formatDate from "../../utils/constants";
import Loader from "../structureShared/Loader";

type Props = {
  user: TUser;
  userConnected: any;
  id: any;
  team: TTeam;
};

export default function PersonalInfos({
  user,
  userConnected,
  id,
  team,
}: Props) {
  return (
    <div>
      <div className="flex lg:w-[40%] ">
        <div className=" w-1/2 m-4 flex flex-col items-center">
          <img
            src={user.imageUrl || "/profile_image.png"}
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
          <p className="font-bold text-[28px] pb-2">{user.firstname}</p>
          <p className="font-bold text-[28px] w-fit pb-4">
            {user.lastname.toUpperCase()}
          </p>
          <div className="flex ">
            <Image
              src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
              width={25}
              height={25}
              alt="picto enedis"
              className="mr-4 w-[25px] h-[25px]"
            />
            <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px]  text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse) ">
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
    </div>
  );
}
