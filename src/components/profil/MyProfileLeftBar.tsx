/* eslint-disable no-console */
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import { TOneTeam, TUser } from "../../types/main";
import CTA from "../structure/CTA";

function MyProfileLeftBar() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const getMyProfileData = async () => {
    const { data } = await axios.get<TUser>(
      `${baseUrl}/users/97af665d-3650-49f3-9ecd-df4d47081903`
    );
    return data;
  };

  const {
    isLoading: isLoadingMyProfile,
    error: errorMyProfile,
    data: myProfileData,
  } = useQuery("getMyProfileData", getMyProfileData);

  if (isLoadingMyProfile || !myProfileData) return <div>En chargement</div>;

  const getMyTeamData = async () => {
    const { data } = await axios.get<TOneTeam>(
      `${baseUrl}/teams/${myProfileData.teamId}`
    );
    return data;
  };

  const {
    isLoading: isLoadingMyTeamData,
    error: errorMyTeamData,
    data: myTeamData,
  } = useQuery("getMyTeamData", getMyTeamData);

  if (isLoadingMyTeamData || !myTeamData) return <div>En chargement</div>;
  if (errorMyTeamData || errorMyProfile)
    return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-full h-fit mt-[52px] bg-blue-enedis">
      <div className="flex">
        <div className="w-[86px] h-[86px] relative overflow-hidden rounded-full">
          <Image
            alt={`${myProfileData.firstname} ${myProfileData.lastname}`}
            src={myProfileData.imageUrl}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p>{myProfileData.firstname}</p>
          <p>{myProfileData.lastname}</p>
          <p>Équipe {myTeamData.name}</p>
        </div>
      </div>
      <CTA action={() => console.log("bonjour")} />
    </div>
  );
}

export default MyProfileLeftBar;
