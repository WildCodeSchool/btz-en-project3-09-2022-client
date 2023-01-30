/* eslint-disable no-console */
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useWindowSize } from "usehooks-ts";
import { useAuth } from "../../../context/UserContext";
import { teamFetcher } from "../../../utils/fetcher";
import CTA from "../../structureShared/CTA";

function MyProfileLeftBar() {
  const router = useRouter();
  const { user } = useAuth();
  const { width } = useWindowSize();

  const {
    isLoading,
    error,
    data: myTeam,
  } = useQuery(
    ["getTeam", user?.teamId],
    () => user && teamFetcher.getOne(user.teamId)
  );

  if (isLoading || !myTeam || !user) return <div>En chargement</div>;
  if (error) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-full h-fit mt-[52px] mb-14">
      <div className="flex mb-6">
        <div className="w-[80px] h-[80px] min-w-[80px] relative overflow-hidden rounded-full">
          <Image
            alt={`${user.firstname} ${user.lastname.toUpperCase()}`}
            src={user.imageUrl || "/picture_avatar.png"}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-start ml-4 max-w-[calc(100%-104px)] break-words">
          <p className="font-enedis font-bold text-mob-xl(headers+titles) md:text-desk-xl(section)">
            {user.firstname}
            <br />
            {user.lastname.toUpperCase()}
          </p>
          <p className="text-mob-sm(multiuse) break-words mt-3 md:text-desk-sm(textPost+multiuse)">
            Équipe {myTeam.name.toLowerCase()}
          </p>
        </div>
        {width < 768 && (
          <div className="ml-3">
            <CTA text="Voir mon profil" action={() => console.log("bonjour")} />
          </div>
        )}
      </div>
      {width >= 768 && (
        <CTA
          text="Voir mon profil"
          action={() => router.push(`/profile/${user.id}`)}
        />
      )}
    </div>
  );
}

export default MyProfileLeftBar;
