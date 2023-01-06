import axios from "axios";
import React from "react";
import Image from "next/image";
import { useQuery } from "react-query";

type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  imageUrl: string;
  workLocation: string;
};

type TSites = {
  id: string;
  name: string;
};

function Profil() {
  const getSites = async () => {
    const response = await axios.get("http://localhost:4000/api/v1/sites");
    return response.data;
  };
  const getUser = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/users");
    return res.data;
  };
  const { isLoading, error, data } = useQuery("getUser", getUser);
  const {
    isLoading: isCharging,
    error: err,
    data: sites,
  } = useQuery("getSites", getSites);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>Sorry something went wrong</p>;
  }
  if (isCharging) {
    return <h2>Loading...</h2>;
  }
  if (err) {
    return <p>Sorry something went wrong</p>;
  }

  return (
    <div className="w-full pb-20 ">
      <hr className="bg-vert h-1 top-0" />
      {data.map((user: TUser) => (
        <div
          key={user.id}
          className="flex justify-between items-start px-2 pt-6"
        >
          <Image
            src={user.imageUrl}
            alt="photo de profil de l'utilisateur"
            width={20}
            height={20}
            className="w-20 h-20 rounded-full border border-vert object-contain "
          />
          <div>
            <p className="font-bold">{user.firstname}</p>
            <p className="font-bold pb-2">{user.lastname}</p>

            <p>{user.workLocation}</p>
          </div>
          <button
            type="button"
            className="text-white bg-vert rounded-full px-2 w-32 h-14"
          >
            Voir
            <br /> mon profil
          </button>
        </div>
      ))}
      <div className="flex justify-between  pt-6 px-2">
        <div className=" w-1/2 flex flex-col items-center">
          <div className="font-bold">Mon Site</div>
          <hr className="bg-bleu h-1  rounded-full w-3/4 mb-4" />
          {sites.map((res: TSites) => (
            <p
              key={res.id}
              className="rounded-full h-7 w-fit border-bleu border text-sm px-2 flex justify-center items-center"
            >
              {res.name}
            </p>
          ))}
        </div>
        <div className=" w-1/2 flex flex-col items-center">
          <div className="font-bold">Mon Equipe</div>
          <hr className="bg-bleu h-1  rounded-full w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default Profil;
