import React from "react";
import profilPicture from "../../public/assets/john-min.JPG";

function MyAccount() {
  return (
    <div className="bg-lightBlue h-full">
      <div className="flex flex-col items-center ">
        <img
          src={profilPicture.src}
          alt="profil"
          className="w-[165px] h-[165px] rounded-[50%] my-[5%]"
        />
        <div className="w-full flex flex-col items-center space-y-3">
          <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
            Modifier mes infos
          </p>
          <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
            Prénom NOM
          </p>
          <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
            nom équipe
          </p>
          <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
            nom site
          </p>
          <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
            email
          </p>
          <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
            anniversaire
          </p>
          <div className="pt-5 w-full flex flex-col items-center space-y-3">
            <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
              Mon équipe
            </p>
            <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
              personne 1
            </p>
            <p>voir plus...</p>
          </div>
          <div className="pt-5 w-full flex flex-col items-center space-y-3">
            <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
              Mes groupes
            </p>
            <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
              groupe 1
            </p>
            <p>voir plus...</p>
          </div>
          <div className="pt-5 w-full flex flex-col items-center space-y-3">
            <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
              Mes publications
            </p>
            <p className="w-1/2 border rounded-md  text-center h-[40px] bg-white">
              groupe 1
            </p>
            <p>voir plus...</p>
          </div>
          <div className="pt-5 w-full flex flex-col items-center space-y-3">
            <p className="flex justify-center items-center w-1/2 border rounded-md  h-[40px] bg-white">
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
