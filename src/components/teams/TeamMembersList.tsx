import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { TUser } from "../../types/main";
import TextTeamMemberCapsuleBlueStroked from "./TextTeamMemberCapsuleBlueStroked";

function TeamMembersList() {
  const [isAllMembers, setIsAllMembers] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  // à remplacer par objet utilisateur authentifié
  const myTeam = "932aa177-9e1d-4cec-a6ab-39ddd1817493";

  const getOneTeam5Members = async () => {
    const { data } = await axios.get<[TUser]>(
      `${baseUrl}/users?team=${myTeam}&limit=2`
    );
    return data;
  };

  const getOneTeamAllMembers = async () => {
    const { data } = await axios.get<[TUser]>(
      `${baseUrl}/users?team=${myTeam}`
    );
    return data;
  };

  const handleAllMembers = () => {
    getOneTeamAllMembers();
    setIsAllMembers(!isAllMembers);
  };

  const {
    isLoading: isLoading5Members,
    error: error5Members,
    data: dataOneTeam5Members,
  } = useQuery("getOneTeam5Members", getOneTeam5Members);

  const {
    isLoading: isLoadingAllMembers,
    error: errorAllMembers,
    data: dataOneTeamAllMembers,
  } = useQuery("getOneTeamAllMembers", getOneTeamAllMembers);

  if (isLoading5Members || !dataOneTeam5Members)
    return <div>En chargement</div>;
  if (isLoadingAllMembers || !dataOneTeamAllMembers)
    return <div>En chargement</div>;
  if (error5Members || errorAllMembers)
    return <div>Une erreur s&apos;est produite</div>;

  return (
    <>
      {isAllMembers ? (
        <div className="w-full flex flex-wrap items-center justify-start">
          {dataOneTeamAllMembers.map((member: TUser) => (
            <TextTeamMemberCapsuleBlueStroked
              key={member.id}
              firstname={member.firstname}
              lastname={member.lastname}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-wrap items-center justify-start">
          {dataOneTeam5Members.map((member: TUser) => (
            <TextTeamMemberCapsuleBlueStroked
              key={member.id}
              firstname={member.firstname}
              lastname={member.lastname}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={handleAllMembers}
        className="text-desk-sm(textPost+multiuse) font-publicSans font-regular mt-3 md:text-mob-sm(multiuse) md:mt-4"
      >
        {isAllMembers ? "Voir moins..." : "Voir plus..."}
      </button>
    </>
  );
}

export default TeamMembersList;
