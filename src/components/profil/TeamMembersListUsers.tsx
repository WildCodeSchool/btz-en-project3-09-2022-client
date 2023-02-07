import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TUser } from "../../types/main";
import { userFetcher } from "../../utils/fetcher";
import TextTeamMemberCapsuleBlueStroked from "../leftBar/Shared/TextTeamMemberCapsuleBlueStroked";
import LoaderFocus from "../structureShared/LoaderFocus";

type Props = {
  user: TUser;
};

function TeamMembersListUsers({ user }: Props) {
  const [isAllMembers, setIsAllMembers] = useState(false);

  const handleAllMembers = () => {
    setIsAllMembers(!isAllMembers);
  };

  const {
    isLoading,
    error,
    data: dataUserByTeam,
  } = useQuery(
    ["getAllByTeam", user?.teamId],
    () => user && userFetcher.getAllByTeam(user.teamId)
  );

  if (isLoading || !dataUserByTeam || !user) return <LoaderFocus />;
  if (error) return <div>Une erreur s&apos;est produite</div>;

  return (
    <>
      {isAllMembers ? (
        <div className="w-full flex flex-wrap items-center justify-start">
          {dataUserByTeam.map((member) => (
            <TextTeamMemberCapsuleBlueStroked
              key={member.id}
              id={member.id}
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
      {dataUserByTeam.length > 5 && (
        <button
          type="button"
          onClick={handleAllMembers}
          className="text-desk-sm(textPost+multiuse) font-publicSans font-regular mt-3 md:text-mob-sm(multiuse) md:mt-4"
        >
          {isAllMembers ? "Voir moins..." : "Voir tout..."}
        </button>
      )}
    </>
  );
}

export default TeamMembersListUsers;
