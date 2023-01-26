import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/UserContext";
import { TUser } from "../../types/main";
import { userFetcher } from "../../utils/fetcher";
import TextTeamMemberCapsuleBlueStroked from "./TextTeamMemberCapsuleBlueStroked";

function TeamMembersList() {
  const [isAllMembers, setIsAllMembers] = useState(false);
  const { user } = useAuth();

  const handleAllMembers = () => {
    if (user) {
      userFetcher.getAllByTeam(user.teamId);
      setIsAllMembers(!isAllMembers);
    }
  };

  const {
    isLoading,
    error,
    data: dataUserByTeam,
  } = useQuery(
    ["getAllByTeam", user?.teamId],
    () => user && userFetcher.getAllByTeam(user.teamId)
  );

  if (isLoading || !dataUserByTeam || !user) return <div>En chargement</div>;
  if (error) return <div>Une erreur s&apos;est produite</div>;

  return (
    <>
      {isAllMembers ? (
        <div className="w-full flex flex-wrap items-center justify-start">
          {dataUserByTeam.map((member) => (
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
          {dataUserByTeam
            .filter((_, index: number) => index < 5)
            .map((member: TUser) => (
              <TextTeamMemberCapsuleBlueStroked
                key={member.id}
                id={member.id}
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
