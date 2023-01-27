import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { TUser } from "../../types/main";
import { userFetcher } from "../../utils/fetcher";
import TextTeamMemberCapsuleBlueStroked from "../teams/TextTeamMemberCapsuleBlueStroked";

function ListMembersSpace() {
  const { user } = useAuth();
  const router = useRouter();
  const { spaceId } = router.query;
  const [isAllMembers, setIsAllMembers] = useState(false);

  const handleAllMembers = () => {
    setIsAllMembers(!isAllMembers);
  };

  const {
    data: dataSpaceMembers,
    error: errorSpaceMembers,
    isLoading: isLoadingSpaceMembers,
  } = useQuery([`membersInSpace`, spaceId], () =>
    userFetcher.getAllBySpace({ spaceId: spaceId as string })
  );

  if (isLoadingSpaceMembers || !dataSpaceMembers || !user)
    return <div>En chargement</div>;
  if (errorSpaceMembers) return <div>Une erreur s&apos;est produite</div>;

  return (
    <>
      {isAllMembers ? (
        <div className="w-full flex flex-wrap items-center justify-start">
          {dataSpaceMembers.map((member) => (
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
          {dataSpaceMembers
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
      {dataSpaceMembers.length > 5 && (
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

export default ListMembersSpace;
