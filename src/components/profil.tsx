import axios from "axios";
import React from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { TUser } from "../types/main";

function Profil() {
  const getAllUser = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
    return res.data;
  };
  const { isLoading, error, data } = useQuery(["getAllUsers"], getAllUser);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>Sorry something went wrong</p>;
  }

  return (
    <div className="w-full pb-20 ">
      <div className="bg-green-enedis h-1 top-0" />
      {data.map((user: TUser) => (
        <div>
          <div
            key={user.id}
            className="flex justify-between items-start px-2 pt-6"
          >
            <Image
              src={user.imageUrl}
              alt="photo de profil de l'utilisateur"
              width={20}
              height={20}
              className="w-20 h-18 rounded-full border object-contain "
            />
            <div className="flex flex-col items-start space-y-1">
              <p className="font-bold">{user.firstname}</p>
              <p className="font-bold ">{user.lastname}</p>
            </div>
            <button
              type="button"
              className="text-white-enedis bg-green-enedis rounded-full px-2 w-32 py-1 text-mob-md(CTA+input) font-bold"
            >
              Voir
              <br /> mon profil
            </button>
          </div>

          <div className="flex justify-between  pt-6 px-2">
            <div className=" w-1/2 flex flex-col items-center">
              <div className="font-bold text-mob-xl(headers+titles) ">
                Mon Site
              </div>
              <div className="bg-blue-enedis h-1  rounded-full w-3/4 mb-4" />
              <p className="border border-blue-enedis rounded-full h-fit px-2 text-mob-sm(multiuse)">
                {user.workLocation}
              </p>
            </div>
            <div className=" w-1/2 flex flex-col items-center">
              <div className="font-bold text-mob-xl(headers+titles)">
                Mon Equipe
              </div>
              <div className="bg-blue-enedis h-1  rounded-full w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profil;
