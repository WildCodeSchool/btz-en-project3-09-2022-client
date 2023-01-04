import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../public/assets/logo-enedis-share_blanc.png";

function Connection() {
  const { register } = useForm();
  return (
    <div className="bg-[#1423DC] rounded-3xl text-white w-4/5 flex flex-col items-center space-y-8 py-6">
      <img src={logo.src} alt="logo" className="w-full" />
      <div className="w-4/5 text-center text-sm">
        Bienvenue sur la plateforme collaborative dédiée aux plans de
        communication d&apos;Enedis.
      </div>
      <div className="text-xl font-bold">Je me connecte</div>
      <form className="flex flex-col space-y-4 w-4/5 text-black">
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/enedis_picto_femme_blanc.png"
            width={50}
            height={10}
            alt="picto of a woman"
          />
          <input
            {...register("email")}
            placeholder="Mon adresse email"
            className="rounded-3xl py-1 px-4 w-full"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/enedis_picto_dossier_blanc.png"
            width={50}
            height={10}
            alt="picto of a woman"
          />
          <input
            {...register("password")}
            placeholder="Mon mot de passe"
            className="rounded-3xl py-1 px-4 w-full"
          />
        </div>
      </form>
      <div className="pt-3 pb-4 flex space-x-3 w-4/5">
        <button
          type="submit"
          className="border text-[10px] font-semibold rounded-full px-5"
        >
          Mot de passe oublié ?
        </button>
        <button
          type="submit"
          className="bg-white text-[#1423DC] text-lg font-semibold rounded-full px-5"
        >
          Connexion
        </button>
      </div>
    </div>
  );
}

export default Connection;
