/* eslint-disable no-console */

import React from "react";
import { useQuery } from "react-query";

import axios from "axios";

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
    <div className="bg-bgLightBlue h-full">
      <div className="flex flex-col items-center ">
        <img
          src="/assets/john-min.jpg"
          alt="profil"
          className="w-[165px] h-[165px] rounded-[50%] my-[5%] object-cover"
        />
        <div className="w-full flex flex-col items-center space-y-3">
          <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
            <img src="/assets/image-3.png" alt="settings" width={32} />
            Modifier mes infos
          </p>
          <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
            Prénom NOM
          </p>
          <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
            nom équipe
          </p>
          <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
            nom site
          </p>
          <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
            email
          </p>
          <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
            anniversaire
          </p>
          <div className="pt-5 w-full flex flex-col items-center space-y-3">
            <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
              Mon équipe
            </p>
            <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
              personne 1
            </p>
            <p>voir plus...</p>
          </div>
          <div className="pt-5 w-full flex flex-col items-center space-y-3">
            <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
              Mes groupes
            </p>
            <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
              groupe 1
            </p>
            <p>voir plus...</p>
          </div>
          <div className="pt-5 w-full flex flex-col items-center space-y-3">
            <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
              Mes publications
            </p>
            <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
              groupe 1
            </p>
            <p>voir plus...</p>
          </div>
          <div className="pt-5 w-full flex flex-col items-center space-y-3">
            <p className="flex justify-center items-center w-1/2 border border-lightBlue rounded-lg  h-[40px] bg-white">
              Mon activité
            </p>
            <p>J&apos;ai commenté X truc de machin...</p>
            <p>voir plus...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
