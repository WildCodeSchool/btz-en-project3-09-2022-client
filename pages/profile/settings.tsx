/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */

import React, { useState } from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useWindowSize } from "usehooks-ts";
import { useAuth } from "../../src/context/UserContext";
import { formatDate } from "../../src/utils/constants";
import { teamFetcher, userFetcher } from "../../src/utils/fetcher";
import Loader from "../../src/components/structureShared/Loader";
import Layout from "../../src/components/layout/Layout";
import CTA from "../../src/components/structureShared/CTA";
import userUpdater from "../../src/utils/updater";

function Settings() {
  const { user } = useAuth();
  const { width } = useWindowSize();
  // states
  const [showBirthday, setShowBirthday] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [infoChanged, setInfoChanged] = useState(false);
  const queryClient = useQueryClient();

  const handleShowBirthday = () => {
    setShowBirthday(!showBirthday);
  };

  const handleShowEmail = () => {
    setShowEmail(!showEmail);
  };

  // fetch user connected data includes team

  if (!user) {
    return <div> Vous devez vous connecter pour y accéder</div>;
  }

  const { data: team, isLoading } = useQuery(
    ["teams", `user-${user?.teamId}`],
    () => teamFetcher.getOne(`${user?.teamId}`)
  );

  const { data: dataFreshUser, isLoading: isLoadingProfilePic } = useQuery(
    ["freshProfilePic", user.id],
    () => userFetcher.getOne(user.id)
  );

  if (isLoading || isLoadingProfilePic || !dataFreshUser) {
    return <Loader />;
  }

  const { imageUrl: freshImageUrl } = dataFreshUser;

  const handleSubmit = async () => {
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("profileImage", image as File);
    await userUpdater.updateProfilePic(user.id, formData);
    setImage(null);
    setInfoChanged(true);
    queryClient.invalidateQueries(["freshProfilePic", user.id]);
  };

  return (
    <div className="lg:bg-white-enedis">
      {width > 640 ? (
        <div className="w-screen min-h-screen pb-10">
          <div className="bg-background-enedis w-[90%] lg:w-2/3 mt-5 pb-10 mx-auto">
            <div className="flex flex-col items-center pt-6">
              <h3 className="mb-2 text-desk-xl(section)">Mon profil</h3>
              <hr className="h-[6px] w-1/4 rounded-full bg-blue-enedis mb-4" />
            </div>
            <div className="flex w-[90%] m-auto justify-around mt-5 mb-5 lg:w-2/3">
              <div className="flex-x-center">
                <img
                  src={
                    (image ? imagePreview : freshImageUrl) ||
                    "/profile_image.svg"
                  }
                  alt="profil"
                  className="w-[165px] h-[165px] rounded-[50%] mt-[5%] -mb-3 object-cover"
                />
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  className={`w-fit h-fit max-w-[180px] relative ${
                    image && "grayscale"
                  }`}
                >
                  <CTA action={() => {}} text="Changer ma photo de profil" />
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files![0]!);
                      setImagePreview(URL.createObjectURL(e.target.files![0]!));
                    }}
                    className="absolute centered-absolute w-full h-full opacity-0 hover:cursor-pointer"
                  />
                </form>
              </div>
              <div className=" space-y-3  w-1/2">
                <p className="flex items-center border border-blue-enedis rounded-full h-[32px] cursor-not-allowed text-desk-lg(CTA+input) w-fit px-4">
                  <Image
                    src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mr-4"
                  />
                  {user?.firstname}
                </p>
                <p className="flex items-center border border-blue-enedis rounded-full  h-[32px] cursor-not-allowed text-desk-lg(CTA+input) w-fit px-4">
                  <Image
                    src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mr-4"
                  />
                  {user?.lastname}
                </p>
                <p className="flex items-center border border-blue-enedis rounded-full  h-[32px] cursor-not-allowed text-desk-lg(CTA+input) w-fit px-4">
                  <Image
                    src="/assets/picto-birthday 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mr-4"
                  />
                  {formatDate(user?.birthday)}
                </p>
                <div className="flex justify-between items-center pt-5">
                  <p className="text-desk-md(titlePubli+multiuse)">
                    Montrer ma date de naissance
                  </p>

                  <label className="switch" htmlFor="showBirthday">
                    <input type="checkbox" id="showBirthday" />
                    <span className="slider slider-d round" />
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-desk-md(titlePubli+multiuse)">
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
                  <p className=" w-5/6 pt-4 text-desk-md(titlePubli+multiuse)">
                    J&apos;utilise l&apos;adresse email :
                  </p>
                  <p className="flex items-center   border border-blue-enedis rounded-full h-[32px] cursor-not-allowed text-desk-lg(CTA+input) w-fit px-4">
                    <Image
                      src="/assets/ENEDIS_PICTO_018_Contact_BLEU_RVB_EXE 1.png"
                      width={25}
                      height={25}
                      alt="picto enedis"
                      className="mr-4"
                    />{" "}
                    {user?.email}
                  </p>
                  <p className="text-left w-5/6 pt-6 text-desk-md(titlePubli+multiuse)">
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
                <div className="w-full flex flex-col items-center pt-6 pb-4 ">
                  <h3 className="mb-2 text-desk-xl(section)">Mon équipe</h3>
                  <hr className="h-[6px] w-1/2 rounded-full bg-blue-enedis" />
                </div>
                <p className=" w-5/6  mb-4 text-desk-md(titlePubli+multiuse)">
                  Je travaille dans l&apos;équipe :
                </p>
                <p className="flex items-center  border border-blue-enedis rounded-full h-[32px] cursor-not-allowed text-desk-lg(CTA+input) w-fit px-4">
                  <Image
                    src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mr-4"
                  />{" "}
                  {team?.name}
                </p>
              </div>
            </div>
          </div>
          {infoChanged ? (
            <div className="flex justify-center space-x-5 mt-5">
              <div className="h-16 w-16 flex-all-center rounded-full bg-green-enedis text-mob-4xl(welcomeConnect) text-white-enedis">
                ✓
              </div>
              <p className="text-mob-lg(multiuse) mt-6">
                La photo a bien été changée !
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className={`mt-4 text-center px-5 py-3 w-fit rounded-full h-fit bg-green-enedis text-white-enedis text-desk-lg(CTA+input) ${
                !image && "grayscale"
              }`}
            >
              J&apos;enregistre les modifications
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center pb-8">
          <div className="bg-background-enedis w-[95%] m-auto mt-2 pb-10 ">
            <div className="flex flex-col items-center pt-6">
              <h3 className="mb-2">Mon profil</h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis mb-4" />
              <div className="flex items-center">
                <img
                  src={
                    (image ? imagePreview : freshImageUrl) ||
                    "/profile_image.svg"
                  }
                  alt="profil"
                  className="w-[150px] h-[150px] rounded-[50%] my-[5%] object-cover"
                />
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  className={`w-fit h-fit max-w-[180px] flex-all-center  ${
                    image && "grayscale"
                  }`}
                >
                  <div className="w-[85%] h-full relative">
                    <CTA action={() => {}} text="Changer ma photo de profil" />
                    <input
                      type="file"
                      onChange={(e) => {
                        setImage(e.target.files![0]!);
                        setImagePreview(
                          URL.createObjectURL(e.target.files![0]!)
                        );
                      }}
                      className="absolute centered-absolute w-full h-full opacity-0 hover:cursor-pointer"
                    />
                  </div>
                </form>
              </div>
              <div className="w-full  flex flex-col  items-center  mt-8 space-y-3">
                <div className="space-y-3 w-fit max-w-full">
                  <p className="flex items-center  border border-blue-enedis rounded-full  h-[32px] cursor-not-allowed w-fit px-4">
                    <Image
                      src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                      width={25}
                      height={25}
                      alt="picto enedis"
                      className="mr-4"
                    />{" "}
                    {user?.firstname}
                  </p>
                  <p className="flex items-center border border-blue-enedis rounded-full w-fit px-4 h-[32px] cursor-not-allowed ">
                    <Image
                      src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                      width={25}
                      height={25}
                      alt="picto enedis"
                      className="mr-4"
                    />{" "}
                    {user?.lastname}
                  </p>
                  <p className="flex items-center   border border-blue-enedis rounded-full w-fit px-4  h-[32px] cursor-not-allowed ">
                    <Image
                      src="/assets/picto-birthday 1.png"
                      width={25}
                      height={25}
                      alt="picto enedis"
                      className="mr-4"
                    />{" "}
                    {formatDate(user?.birthday)}
                  </p>
                </div>
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
                <p className="w-5/6 pt-4">
                  J&apos;utilise l&apos;adresse email :
                </p>
                <p className="flex items-center  border border-blue-enedis rounded-full w-fit px-4 h-[32px] cursor-not-allowed ">
                  <Image
                    src="/assets/ENEDIS_PICTO_018_Contact_BLEU_RVB_EXE 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="mr-4"
                  />{" "}
                  {user?.email}
                </p>
                <p className=" w-5/6 pt-6 ">Je change mon mot de passe :</p>
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
              <div className="w-full flex flex-col items-center pt-8 pb-4">
                <h3 className="mb-2">Mon équipe</h3>
                <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
              </div>
              <p className="text-left w-5/6  mb-4">
                Je travaille dans l&apos;équipe :
              </p>
              <p className="flex items-center  w-fit px-4 border border-blue-enedis rounded-full h-[32px] cursor-not-allowed ">
                <Image
                  src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
                  width={25}
                  height={25}
                  alt="picto enedis"
                  className="mr-4"
                />
                {team?.name}
              </p>
            </div>
          </div>
          {infoChanged ? (
            <div className="flex justify-center space-x-5">
              <div className="h-16 w-16 flex-all-center rounded-full bg-green-enedis text-mob-4xl(welcomeConnect) text-white-enedis">
                ✓
              </div>
              <p className="text-mob-md(CTA+input) mt-6">
                La photo a bien été changée !
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className={`mt-4 text-center px-5 py-3 w-fit rounded-full h-fit bg-green-enedis text-white-enedis text-desk-lg(CTA+input) ${
                !image && "grayscale"
              }`}
            >
              J&apos;enregistre les modifications
            </button>
          )}
        </div>
      )}
    </div>
  );
}
Settings.getLayout = (page: never) => <Layout>{page}</Layout>;

export default Settings;
