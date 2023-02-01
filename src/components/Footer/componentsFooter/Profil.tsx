/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../../context/UserContext";
import { teamFetcher, userFetcher } from "../../../utils/fetcher";
import { TUser } from "../../../types/main";

function Profil() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["teams", `user-${user?.teamId}`],
    () => teamFetcher.getOne(`${user?.teamId}`),
    {}
  );

  const { data: members, isLoading: loadMembers } = useQuery(
    ["users", user?.teamId],
    () => user && userFetcher.getAllByTeam(user.teamId)
  );

  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }

  if (loadMembers || !members) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="w-full ">
      <div className="bg-green-enedis h-1 top-0 " />

      <div className="">
        <div className="flex justify-between items-center px-4 pt-6 ">
          <div className="w-20 h-20 min-h-20 min-w-20 rounded-full relative overflow-hidden">
            <Image
              src={user!.imageUrl}
              alt="Profil de l'utilisateur"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-fit flex flex-col items-start space-y-1 ml-2 ">
            <p className="text-mob-lg(multiuse) font-bold">{user?.firstname}</p>
            <p className="text-mob-lg(multiuse) font-bold">
              {user?.lastname.toUpperCase()}
            </p>
            <p className="text-mob-sm(multiuse) text-left pt-1">
              Equipe {data?.name}
            </p>
          </div>
          <Link href="/profile">
            <button
              type="button"
              className="text-white-enedis bg-green-enedis rounded-full px-2 w-32 py-1 text-mob-md(CTA+input) font-bold"
            >
              Voir
              <br /> mon profil
            </button>
          </Link>
        </div>

        <div className="flex justify-between  pt-6 px-2 pb-5">
          <div className=" w-1/2 flex flex-col items-center">
            <div className="font-bold text-mob-xl(headers+titles) ">
              Mon Site
            </div>
            <div className="bg-blue-enedis h-1 rounded-full w-3/4 mb-4" />
            <p className="border border-blue-enedis rounded-full h-fit  text-mob-sm(multiuse) px-4 py-[6px]">
              {user?.workLocation}
            </p>
          </div>
          <div className=" w-1/2 flex flex-col items-center">
            <div className="font-bold text-mob-xl(headers+titles)">
              Mon Equipe
            </div>

            <div className="bg-blue-enedis h-1  rounded-full w-3/4 mb-4" />
            <div className="space-y-2">
              <div className="space-y-2 overflow-auto h-40">
                {members.map((member: TUser) => (
                  <div
                    key={member.id}
                    className="w-fit flex justify-start items-center overflow-hidden mb-2 mr-2"
                  >
                    <div className="w-[30px] min-w-[30px] h-[30px] relative rounded-full overflow-hidden -mr-3">
                      <Image
                        alt={
                          `${
                            member.firstname
                          } ${member.lastname.toUpperCase()}` || "nom prénom"
                        }
                        src={member.imageUrl || "/profile_image.png"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Link href={`/profile/${member.id}`}>
                      <div className="w-fit max-w-[130px]  rounded-full border border-blue-enedis px-4 py-[6px]">
                        <p className="text-mob-xs(textPost) truncate scrollbar-hide hover:text-clip hover:overflow-x-visible md:text-desk-sm(textPost+multiuse)">
                          {member.firstname} {member.lastname.toUpperCase()}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
