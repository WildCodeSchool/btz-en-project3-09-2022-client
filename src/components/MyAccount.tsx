/* eslint-disable no-console */

import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "next/image";

function MyAccount() {
  // Get users
  const getOneUser = async () => {
    try {
      const user = await axios.get(`http://localhost:4000/api/v1/users/`);
      return user.data;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  // UseQuery
  const { isLoading, data: user, error } = useQuery("user", getOneUser);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>Something bad happen</p>;
  }

  console.log(user);

  return (
    <div className="flex flex-col items-center pb-8">
      <div className="bg-bgLightBlue w-[95%] m-auto mt-2 pb-10 ">
        <div className="flex flex-col items-center pt-6">
          <h3>Mon profil</h3>
          <hr className="h-[6px] w-2/3 rounded-full bg-bleu mb-4" />
          <div>
            <img
              src="/assets/john-min.jpg"
              alt="profil"
              className="w-[165px] h-[165px] rounded-[50%] my-[5%] object-cover"
            />
            <button
              type="button"
              className="absolute top-52 text-center px-2 pt-1 w-[165px] rounded-full h-[53px] bg-vert text-white"
            >
              Changer <br /> ma photo de profil
            </button>
          </div>
          <div className="w-full  flex flex-col items-center  mt-14 space-y-3">
            <p className="flex items-center  w-3/4 border border-bleu rounded-full  h-[32px] cursor-not-allowed ">
              <Image
                src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                width={25}
                height={25}
                alt="picto enedis"
                className="mx-4"
              />{" "}
              Prénom
            </p>
            <p className="flex items-center  w-3/4 border border-bleu rounded-full  h-[32px] cursor-not-allowed ">
              <Image
                src="/assets/ENEDIS_PICTO_020_Homme_BLEU_RVB_EXE 1.png"
                width={25}
                height={25}
                alt="picto enedis"
                className="mx-4"
              />{" "}
              Nom
            </p>
            <p className="flex items-center  w-3/4 border border-bleu rounded-full  h-[32px] cursor-not-allowed ">
              <Image
                src="/assets/picto-birthday 1.png"
                width={25}
                height={25}
                alt="picto enedis"
                className="mx-4"
              />{" "}
              XX/XX/XXXX
            </p>
            <div className="flex pt-4  w-3/4 justify-between items-center">
              <p>Montrer ma date de naissance</p>

              <label className="switch" htmlFor="showBirthday">
                <input type="checkbox" id="showBirthday" />
                <span className="slider round" />
              </label>
            </div>
            <div className="flex  w-3/4 justify-between items-center">
              <p>Montrer mon adresse email</p>

              <label className="switch" htmlFor="showEmail">
                <input type="checkbox" id="showEmail" />
                <span className="slider round" />
              </label>
            </div>
            <div className="w-full flex flex-col items-center pt-4 pb-4">
              <h3>Ma connexion</h3>
              <hr className="h-[6px] w-2/3 rounded-full bg-bleu" />
            </div>
            <p className="text-left w-3/4 ">
              J&apos;utilise l&apos;adresse email :
            </p>
            <p className="flex items-center  w-3/4 border border-bleu rounded-full h-[32px] cursor-not-allowed ">
              <Image
                src="/assets/ENEDIS_PICTO_018_Contact_BLEU_RVB_EXE 1.png"
                width={25}
                height={25}
                alt="picto enedis"
                className="mx-4"
              />{" "}
              john.doe@enedis.fr
            </p>
            <p className="text-left w-3/4 ">Je change mon mot de passe :</p>
            <input
              type="password"
              placeholder="Mon nouveau mot de passe"
              className="rounded-full h-[32px] pl-6 border-2"
            />
            <input
              type="password"
              placeholder="Confirmer mon mot de passe"
              className="rounded-full h-[32px] pl-6 border-2"
            />
            <p className="text-left w-3/4">
              Le mot de passe doit contenir au moins 8 caractères, dont au
              moins: 1chiffre, 1 lettre en majuscule, 1 lettre en minuscule et 1
              caractère spécial.
            </p>
          </div>
          <div className="w-full flex flex-col items-center pt-4 pb-4">
            <h3>Mon équipe</h3>
            <hr className="h-[6px] w-2/3 rounded-full bg-bleu" />
          </div>
          <p className="text-left w-3/4  mb-4">
            Je travaille dans l&apos;équipe :
          </p>
          <p className="flex items-center  w-3/4 border border-bleu rounded-full h-[32px] cursor-not-allowed ">
            <Image
              src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
              width={25}
              height={25}
              alt="picto enedis"
              className="mx-4"
            />{" "}
            Marketing
          </p>
        </div>
      </div>
      <button
        type="button"
        className=" mt-8 text-center px-2 pt-1 w-3/4 rounded-full h-[35px] bg-vert text-white"
      >
        J&apos;enregistre les modifications
      </button>
    </div>
  );
}

export default MyAccount;
