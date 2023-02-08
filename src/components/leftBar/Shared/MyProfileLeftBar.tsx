/* eslint-disable no-console */
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useWindowSize } from "usehooks-ts";
import { useAuth } from "../../../context/UserContext";
import { teamFetcher, userFetcher } from "../../../utils/fetcher";
import CTA from "../../structureShared/CTA";
import LoaderFocus from "../../structureShared/LoaderFocus";

function MyProfileLeftBar() {
  const router = useRouter();
  const { user } = useAuth();
  const { width } = useWindowSize();

  if (!user) {
    return <div> Vous devez vous connecter pour y accéder</div>;
  }

  const {
    isLoading,
    error,
    data: myTeam,
  } = useQuery(
    ["getTeam", user?.teamId],
    () => user && teamFetcher.getOne(user.teamId)
  );

  const { data: dataFreshUser, isLoading: isLoadingProfilePic } = useQuery(
    ["freshProfilePic", user.id],
    () => userFetcher.getOne(user.id)
  );

  if (isLoading || !myTeam || isLoadingProfilePic || !dataFreshUser)
    return <LoaderFocus />;
  if (error) return <div>Une erreur s&apos;est produite</div>;

  const { imageUrl: freshImageUrl } = dataFreshUser;

  return (
    <div className="w-full h-fit mt-[52px] mb-14">
      <div className="w-full flex mb-6">
        <div className="w-[70px] h-[70px] min-w-[70px] min-h-[70px] lg:w-[80px] lg:h-[80px] lg:min-w-[80px] lg:min-h-[80px] relative overflow-hidden rounded-full">
          <Image
            alt={`${user.firstname} ${user.lastname.toUpperCase()}`}
            src={freshImageUrl || "/profile_image.svg"}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full text-start ml-4 max-w-[calc(100%-85px)] lg:max-w-[calc(100%-96px)] break-words">
          <p className="font-enedis font-bold text-mob-xl(headers+titles) md:text-desk-lg(CTA+input)">
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
