import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/UserContext";
import { teamFetcher, userFetcher } from "../../../utils/fetcher";
import { TUser } from "../../../types/main";

function Profil() {
  const { user } = useAuth();
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["teams", `user-${user?.teamId}`],
    () => teamFetcher.getOne(`${user?.teamId}`),
    {}
  );

  const { data: members, isLoading: loadMembers } = useQuery(
    ["users", user?.teamId],
    () => user && userFetcher.getAllByTeam(user.teamId)
  );

  if (isLoading || loadMembers) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="w-full ">
      <div className="bg-green-enedis h-1 top-0 " />

      <div className="">
        <div
          key={user?.id}
          className="flex justify-between items-center px-2 pt-6 "
        >
          <img
            src={user?.imageUrl}
            alt=" de profil de l'utilisateur"
            // width={60}
            // height={0}
            className=" w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col items-start space-y-1">
            <p className="font-bold">{user?.firstname}</p>
            <p className="font-bold ">{user?.lastname.toUpperCase()}</p>
            <p className="text-desk-xxs(mention) pt-2">Equipe {data?.name}</p>
          </div>
          <button
            onClick={() => router.push("/myaccount")}
            type="button"
            className="text-white-enedis bg-green-enedis rounded-full px-2 w-32 py-1 text-mob-md(CTA+input) font-bold"
          >
            Voir
            <br /> mon profil
          </button>
        </div>

        <div className="flex justify-between  pt-6 px-2 pb-5">
          <div className=" w-1/2 flex flex-col items-center">
            <div className="font-bold text-mob-xl(headers+titles) ">
              Mon Site
            </div>
            <div className="bg-blue-enedis h-1  rounded-full w-3/4 mb-4" />
            <p className="border border-blue-enedis rounded-full h-fit px-2 text-mob-sm(multiuse)">
              {user?.workLocation}
            </p>
          </div>
          <div className=" w-1/2 flex flex-col items-center">
            <div className="font-bold text-mob-xl(headers+titles)">
              Mon Equipe
            </div>

            <div className="bg-blue-enedis h-1  rounded-full w-3/4 mb-4" />
            <div className="space-y-2">
              {members?.map((userTeam: TUser) => (
                <p
                  key={userTeam.id}
                  className="border border-blue-enedis rounded-full h-fit  w-fit text-mob-sm(multiuse) px-2 "
                >
                  {userTeam.firstname} {userTeam.lastname}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
