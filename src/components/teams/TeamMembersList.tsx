import React, { useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../context/UserContext";
import { TUser } from "../../types/main";
import { userFetcher } from "../../utils/fetcher";
import TextTeamMemberCapsuleBlueStroked from "./TextTeamMemberCapsuleBlueStroked";

function TeamMembersList() {
  const [isAllMembers, setIsAllMembers] = useState(false);
  const { user } = useAuth();

  const handleAllMembers = () => {
    if (user) {
      userFetcher.getAllMembersOneTeam(user.teamId, user.id);
      setIsAllMembers(!isAllMembers);
    }
  };

  const {
    isLoading: isLoading5Members,
    error: error5Members,
    data: dataOneTeam5Members,
  } = useQuery(
    ["getOneTeam5Members", user?.teamId],
    () => user && userFetcher.get5MembersOneTeam(user.teamId, user.id)
  );
  const {
    isLoading: isLoadingAllMembers,
    error: errorAllMembers,
    data: dataOneTeamAllMembers,
  } = useQuery(
    ["getAllMembersOneTeam", user?.teamId],
    () => user && userFetcher.getAllMembersOneTeam(user.teamId, user.id)
  );

  if (isLoading5Members || !dataOneTeam5Members || !user)
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
