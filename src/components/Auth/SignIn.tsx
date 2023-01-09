import Image from "next/image";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import logo from "../../../public/assets/logo-enedis-share_blanc.png";
import { useAuth } from "../../context/UserContext";

function SignIn() {
  const { signIn } = useAuth();

  type TCredentials = {
    email: string;
    password: string;
  };

  const { register, handleSubmit } = useForm<TCredentials>();

  const onSubmit = (data: FieldValues) => {
    signIn({ email: data.email, password: data.password });
  };

  return (
    <div className="bg-blue-enedis rounded-connection-bloc text-white-enedis w-4/5 flex flex-col items-center space-y-8 py-6 sm:w-3/5 xl:w-2/5 xl:pb-10">
      <img src={logo.src} alt="logo" className="w-full" />
      <div className="w-4/5 text-center text-sm font-publicSans">
        Bienvenue sur la plateforme collaborative dédiée aux plans de
        communication d&apos;Enedis.
      </div>
      <div className="text-xl font-bold font-publicSans">Je me connecte</div>
      <div>
        <form>
          <div className="flex flex-col space-y-3 text-dark-enedis text-sm font-publicSans items-center justify-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/enedis_picto_femme_blanc.png"
                width={40}
                height={10}
                alt="picto of a woman"
              />
              <input
                {...register("email", { required: true })}
                placeholder="Mon adresse email"
                className="rounded-connection-bloc py-[6px] px-8 sm:px-10 lg:px-24"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/enedis_picto_dossier_blanc.png"
                width={40}
                height={10}
                alt="picto of a woman"
              />
              <input
                {...register("password", { required: true })}
                placeholder="Mon mot de passe"
                className="rounded-connection-bloc py-[6px] px-8 sm:px-10 lg:px-24"
                type="password"
              />
            </div>
          </div>
          <div className="pt-10 pb-4 flex font-bold space-x-3 justify-center lg:py-10">
            <button
              type="button"
              className="border text-desk-xxs(mention) rounded-full px-5 py-2"
            >
              Mot de passe oublié ?
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              type="button"
              className="bg-white-enedis text-blue-enedis text-desk-lg(CTA+input) rounded-full px-5"
            >
              Connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
