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
    <div className="bg-blue-enedis rounded-connection-bloc text-white-enedis w-4/5 flex flex-col items-center py-6 px-6 max-w-[550px] xs:py-10 xs:px-10">
      <img src={logo.src} alt="logo" className="w-full" />
      <div className="w-full sm:w-4/5 text-center font-publicSans text-mob-sm(multiuse) mt-4">
        Bienvenue sur la plateforme collaborative dédiée aux plans de
        communication d&apos;Enedis.
      </div>
      <div className="font-bold font-publicSans text-desk-xl(section) mt-8">
        Je me connecte
      </div>
      <div className="w-full mt-9">
        <form className="w-full">
          <div className="flex flex-col space-y-3 text-dark-enedis font-publicSans items-center justify-center">
            <div className="flex items-center justify-center space-x-3 w-full">
              <Image
                src="/assets/enedis_picto_femme_blanc.png"
                width={40}
                height={40}
                alt="picto of a woman"
              />
              <input
                {...register("email", { required: true })}
                placeholder="Mon adresse email"
                className="rounded-connection-bloc py-[6px] px-4 w-full xs:w-4/5 max-w-[80%] xs:max-w-full placeholder:italic placeholder:font-light"
              />
            </div>
            <div className="flex items-center justify-center space-x-3 w-full">
              <Image
                src="/assets/enedis_picto_dossier_blanc.png"
                width={40}
                height={40}
                alt="picto of a woman"
              />
              <input
                {...register("password", { required: true })}
                placeholder="Mon mot de passe"
                className="rounded-connection-bloc py-[6px] px-4 w-full xs:w-4/5 max-w-[80%] xs:max-w-full placeholder:italic placeholder:font-light"
                type="password"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse xs:flex-row items-center justify-center font-bold mt-8">
            <button
              type="button"
              className="border text-desk-xxs(mention) rounded-full px-5 py-2"
            >
              Mot de passe oublié ?
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              type="button"
              className="mb-4 xs:mb-0 xs:ml-4 bg-white-enedis text-blue-enedis w-fit text-desk-lg(CTA+input) rounded-full px-4 py-[6px]"
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
