/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuth } from "../../../context/UserContext";
import { TCategory, TUser } from "../../../types/main";
import { userFetcher } from "../../../utils/fetcher";
import TextTeamMemberCapsuleBlueStroked from "../Shared/TextTeamMemberCapsuleBlueStroked";

interface IProps {
  dataCategory: TCategory;
}

function ListMembersCategory({ dataCategory }: IProps) {
  const { user } = useAuth();
  const [isAllMembers, setIsAllMembers] = useState(false);
  const { id: categoryId, ownerId } = dataCategory;

  const handleAllMembers = () => {
    setIsAllMembers(!isAllMembers);
  };

  const {
    data: dataCategoryMembers,
    error: errorCategoryMembers,
    isLoading: isLoadingCategoryMembers,
  } = useQuery([`membersInCategory`, categoryId], () =>
    userFetcher.getAllByCategory(dataCategory.id)
  );

  if (isLoadingCategoryMembers || !dataCategoryMembers || !user)
    return <div>En chargement</div>;
  if (errorCategoryMembers) return <div>Une erreur s&apos;est produite</div>;

  return (
    <>
      {isAllMembers ? (
        <div className="w-full flex flex-wrap items-center justify-start">
          {dataCategoryMembers.map((member) => (
            <TextTeamMemberCapsuleBlueStroked
              key={member.id}
              id={member.id}
              firstname={member.firstname}
              lastname={member.lastname}
              imageUrl={member.imageUrl}
              ownerId={ownerId}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-wrap items-center justify-start">
          {dataCategoryMembers
            .filter((_, index: number) => index < 5)
            .map((member: TUser) => (
              <TextTeamMemberCapsuleBlueStroked
                key={member.id}
                id={member.id}
                firstname={member.firstname}
                lastname={member.lastname}
                imageUrl={member.imageUrl}
                ownerId={ownerId}
              />
            ))}
        </div>
      )}
      {dataCategoryMembers.length > 5 && (
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

export default ListMembersCategory;
