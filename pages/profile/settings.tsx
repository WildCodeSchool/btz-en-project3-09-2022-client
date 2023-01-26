/* eslint-disable no-console */

import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useWindowSize } from "usehooks-ts";
import { useAuth } from "../../src/context/UserContext";
import { formatDate } from "../../src/utils/constants";
import { teamFetcher } from "../../src/utils/fetcher";
import Loader from "../../src/components/Loader";

function SettingsMobile() {
  const { user } = useAuth();
  const { width } = useWindowSize();
  // states
  const [showBirthday, setShowBirthday] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const handleShowBirthday = () => {
    setShowBirthday(!showBirthday);
  };

  const handleShowEmail = () => {
    setShowEmail(!showEmail);
  };

  // fetch user connected data includes team
  if (!user) {
    return <Loader />;
  }

  const { data: team, isLoading } = useQuery(
    ["teams", `user-${user?.teamId}`],
    () => teamFetcher.getOne(`${user?.teamId}`)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(width);

  return (
    <div>
      {width > 640 ? (
        <div>
          <div className="bg-background-enedis w-[60%] m-auto mt-2 pb-10 ">
            <div className="flex flex-col items-center pt-6">
              <h3 className="mb-2 text-desk-xl(section)">Mon profil</h3>
              <hr className="h-[6px] w-1/4 rounded-full bg-blue-enedis mb-4" />
            </div>
            <div className="flex w-[90%] m-auto justify-around mt-5">
              <div className="flex">
                <img
                  src={user?.imageUrl}
                  alt="profil"
                  className="w-[165px] h-[165px] rounded-[50%] my-[5%] object-cover"
                />
                <button
                  type="button"
                  className=" absolute top-60  text-center px-2  w-[165px] rounded-full h-[53px] bg-green-enedis text-white-enedis text-desk-lg(CTA+input)"
                >
                  Changer ma photo de profil
                </button>
              </div>
              <div className=" space-y-3  w-1/2">
                <p className="flex items-center border border-blue-enedis rounded-full h-[32px] cursor-not-allowed text-desk-lg(CTA+input) ">
                  <Image
                    src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mx-4"
                  />
                  {user?.firstname}
                </p>
                <p className="flex items-center border border-blue-enedis rounded-full  h-[32px] cursor-not-allowed text-desk-lg(CTA+input)">
                  <Image
                    src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mx-4"
                  />
                  {user?.lastname}
                </p>
                <p className="flex items-center border border-blue-enedis rounded-full  h-[32px] cursor-not-allowed text-desk-lg(CTA+input) ">
                  <Image
                    src="/assets/picto-birthday 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mx-4"
                  />
                  {formatDate(user?.birthday)}
                </p>
                <div className="flex justify-between items-center pt-5">
                  <p className="text-desk-sm(textPost+multiuse)">
                    Montrer ma date de naissance
                  </p>

                  <label className="switch" htmlFor="showBirthday">
                    <input type="checkbox" id="showBirthday" />
                    <span className="slider slider-d round" />
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-desk-sm(textPost+multiuse)">
                    Montrer mon adresse email
                  </p>

                  <label className="switch" htmlFor="showEmail">
                    <input type="checkbox" id="showEmail" />
                    <span className="slider slider-d round " />
                  </label>
                </div>
              </div>
            </div>
            {/*  */}

            <div className="flex">
              <div className="flex flex-col w-1/2 items-center">
                <div className="w-full flex flex-col items-center pt-6 ">
                  <h3 className="mb-2 text-desk-xl(section)">Ma connexion</h3>
                  <hr className="h-[6px] w-1/2 rounded-full bg-blue-enedis" />
                </div>

                <div className="flex flex-col items-center space-y-3">
                  <p className="text-left w-5/6 pt-4 text-desk-sm(textPost+multiuse)">
                    J&apos;utilise l&apos;adresse email :
                  </p>
                  <p className="flex items-center  w-5/6 border border-blue-enedis rounded-full h-[32px] cursor-not-allowed text-desk-lg(CTA+input)">
                    <Image
                      src="/assets/ENEDIS_PICTO_018_Contact_BLEU_RVB_EXE 1.png"
                      width={25}
                      height={25}
                      alt="picto enedis"
                      className="mx-4"
                    />{" "}
                    {user?.email}
                  </p>
                  <p className="text-left w-5/6 pt-6 text-desk-sm(textPost+multiuse)">
                    Je change mon mot de passe :
                  </p>
                  <input
                    type="password"
                    placeholder="Mon nouveau mot de passe"
                    className="w-5/6 rounded-full h-[32px] pl-6 border-2 text-desk-sm(textPost+multiuse)"
                  />
                  <input
                    type="password"
                    placeholder="Confirmer mon mot de passe"
                    className="w-5/6 rounded-full h-[32px] pl-6 border-2 text-desk-sm(textPost+multiuse)"
                  />
                  <p className="text-left text-desk-xxs(mention) w-5/6 ">
                    Le mot de passe doit contenir au moins 8 caractères, dont au
                    moins: 1 chiffre, 1 lettre en majuscule, 1 lettre en
                    minuscule et 1 caractère spécial.
                  </p>
                </div>
              </div>
              {/*  */}

              <div className="flex flex-col w-1/2 items-center">
                <div className="w-full flex flex-col items-center pt-4 pb-4 ">
                  <h3 className="mb-2 text-desk-xl(section)">Mon équipe</h3>
                  <hr className="h-[6px] w-1/2 rounded-full bg-blue-enedis" />
                </div>
                <p className="text-left w-5/6  mb-4 text-desk-sm(textPost+multiuse)">
                  Je travaille dans l&apos;équipe :
                </p>
                <p className="flex items-center  w-5/6 border border-blue-enedis rounded-full h-[32px] cursor-not-allowed text-desk-lg(CTA+input)">
                  <Image
                    src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mx-4"
                  />{" "}
                  sdsdf
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 text-center px-2 w-1/3 rounded-full h-[35px] bg-green-enedis text-white-enedis text-desk-lg(CTA+input) "
          >
            J&apos;enregistre les modifications
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center pb-8">
          <div className="bg-background-enedis w-[95%] m-auto mt-2 pb-10 ">
            <div className="flex flex-col items-center pt-6">
              <h3 className="mb-2">Mon profil</h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis mb-4" />
              <div className="flex">
                <img
                  src={user?.imageUrl}
                  alt="profil"
                  className="w-[165px] h-[165px] rounded-[50%] my-[5%] object-cover"
                />
                <button
                  type="button"
                  className=" absolute top-60  text-center px-2  w-[165px] rounded-full h-[53px] bg-green-enedis text-white-enedis"
                >
                  Changer <br /> ma photo de profil
                </button>
              </div>
              <div className="w-full  flex flex-col items-center  mt-14 space-y-3">
                <p className="flex items-center  w-5/6 border border-blue-enedis rounded-full  h-[32px] cursor-not-allowed ">
                  <Image
                    src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mx-4"
                  />{" "}
                  {user?.firstname}
                </p>
                <p className="flex items-center  w-5/6 border border-blue-enedis rounded-full  h-[32px] cursor-not-allowed ">
                  <Image
                    src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mx-4"
                  />{" "}
                  {user?.lastname}
                </p>
                <p className="flex items-center  w-5/6 border border-blue-enedis rounded-full  h-[32px] cursor-not-allowed ">
                  <Image
                    src="/assets/picto-birthday 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mx-4"
                  />{" "}
                  {formatDate(user?.birthday)}
                </p>
                <div className="flex pt-4  w-5/6 justify-between items-center ">
                  <p className="">Montrer ma date de naissance</p>

                  <label className="switch" htmlFor="showBirthday">
                    <input
                      type="checkbox"
                      id="showBirthday"
                      onClick={handleShowBirthday}
                    />
                    <span className="slider round" />
                  </label>
                </div>
                <div className="flex  w-5/6 justify-between items-center">
                  <p>Montrer mon adresse email</p>

                  <label className="switch" htmlFor="showEmail">
                    <input
                      type="checkbox"
                      id="showEmail"
                      onClick={handleShowEmail}
                    />
                    <span className="slider round" />
                  </label>
                </div>
                <div className="w-full flex flex-col items-center pt-4 pb-4">
                  <h3 className="mb-2">Ma connexion</h3>
                  <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
                </div>
                <p className="text-left w-5/6 pt-4">
                  J&apos;utilise l&apos;adresse email :
                </p>
                <p className="flex items-center  w-5/6 border border-blue-enedis rounded-full h-[32px] cursor-not-allowed ">
                  <Image
                    src="/assets/ENEDIS_PICTO_018_Contact_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mx-4"
                  />{" "}
                  {user?.email}
                </p>
                <p className="text-left w-5/6 pt-6 ">
                  Je change mon mot de passe :
                </p>
                <input
                  type="password"
                  placeholder="Mon nouveau mot de passe"
                  className="w-5/6 rounded-full h-[32px] pl-6 border-2"
                />
                <input
                  type="password"
                  placeholder="Confirmer mon mot de passe"
                  className="w-5/6 rounded-full h-[32px] pl-6 border-2"
                />
                <p className="text-left text-mob-xxs(mention+date) w-5/6 ">
                  Le mot de passe doit contenir au moins 8 caractères, dont au
                  moins: 1 chiffre, 1 lettre en majuscule, 1 lettre en minuscule
                  et 1 caractère spécial.
                </p>
              </div>
              <div className="w-full flex flex-col items-center pt-4 pb-4">
                <h3 className="mb-2">Mon équipe</h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
              </div>
              <p className="text-left w-5/6  mb-4">
                Je travaille dans l&apos;équipe :
              </p>
              <p className="flex items-center  w-5/6 border border-blue-enedis rounded-full h-[32px] cursor-not-allowed ">
                <Image
                  src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
                  width={25}
                  height={25}
                  alt="picto enedis"
                  className="mx-4"
                />
                {team?.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 text-center px-2 w-5/6 rounded-full h-[35px] bg-green-enedis text-white-enedis "
          >
            J&apos;enregistre les modifications
          </button>
        </div>
      )}
    </div>
  );
}

export default SettingsMobile;
