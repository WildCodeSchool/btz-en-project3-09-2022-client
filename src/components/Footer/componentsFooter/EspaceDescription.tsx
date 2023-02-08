/* eslint-disable @typescript-eslint/return-await */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { spaceFetcher, userFetcher } from "../../../utils/fetcher";
import { TUser } from "../../../types/main";
import LoaderFocus from "../../structureShared/LoaderFocus";

function EspaceDescription() {
  const router = useRouter();
  const { spaceId } = router.query;

  const { data, isLoading } = useQuery(["space", spaceId], () =>
    spaceFetcher.getOne(spaceId as string)
  );

  const { data: members, isLoading: membersLoading } = useQuery(
    ["users", spaceId],
    () => userFetcher.getAllBySpace({ spaceId: spaceId as string })
  );

  if (isLoading || !data) {
    return <LoaderFocus />;
  }

  if (membersLoading || !members) {
    return <LoaderFocus />;
  }
  return (
    <div className="bg-background-enedis flex-all-center w-full py-4">
      <div className="bg-green-enedis h-1 top-0 w-full mb-6" />
      <div className="w-2/3">
        <div className="flex-all-center w-full">
          <div className="text-mob-xl(headers+titles) font-bold mb-1 ">
            Description de l&apos;espace
          </div>
          <div className="bg-blue-enedis h-1 top-0 w-full rounded-full" />
          <p className="text-mob-xs(textPost) m-3 w-full text-left">
            {data.description}
          </p>

          <div className="text-mob-xl(headers+titles) font-bold mb-1">
            Membres de l&apos;espace
          </div>
          <div className="bg-blue-enedis h-1 top-0 w-full rounded-full" />
          <div className="space-y-2 overflow-auto h-44 py-6">
            {members.map((member: TUser) => (
              <div
                key={member.id}
                className="w-fit flex justify-start items-center overflow-hidden mb-2 mr-2"
              >
                <div className="w-[30px] min-w-[30px] h-[30px] relative rounded-full overflow-auto -mr-3">
                  <Image
                    alt={
                      `${member.firstname} ${member.lastname.toUpperCase()}` ||
                      "nom prénom"
                    }
                    src={member.imageUrl || "/profile_image.svg"}
                    fill
                    className="object-cover"
                  />
                </div>
                <Link href={`/profile/${member.id}`}>
                  <div className="w-fit  rounded-full border border-blue-enedis px-4 py-[6px]">
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
  );
}

export default EspaceDescription;
