/* eslint-disable @typescript-eslint/return-await */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import ModifyUser from "./ModifyUser";
import AddUser from "./AddUser";
import { spaceFetcher, userFetcher } from "../../../utils/fetcher";
import { TUser } from "../../../types/main";

function EspaceDescription() {
  const router = useRouter();
  const { spaceId } = router.query;

  const [modify, setModify] = useState(false);
  const [addUser, setAddUser] = useState(false);

  const HandleOpenModifyUser = () => {
    setModify(!modify);
  };
  const HandleOpenAddUser = () => {
    setAddUser(!addUser);
  };

  const { data, isLoading } = useQuery(["space", spaceId], () =>
    spaceFetcher.getOne(spaceId as string)
  );

  const { data: members, isLoading: membersLoading } = useQuery(
    ["users", spaceId],
    () => userFetcher.getAllBySpace({ spaceId: spaceId as string })
  );

  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }

  if (membersLoading || !members) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="bg-background-enedis flex-all-center w-full">
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
          <div>
            {modify && (
              <AnimatePresence>
                <motion.div
                  exit={{ y: -280 }}
                  initial={{ y: 280 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-2/3 w-full bg-green-enedis z-50 flex flex-col justify-center items-center"
                >
                  <ModifyUser HandleOpenModifyUser={HandleOpenModifyUser} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          <div>
            {addUser && (
              <AnimatePresence>
                <motion.div
                  exit={{ y: -280 }}
                  initial={{ y: 280 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-2/3 w-full bg-green-enedis z-50 flex flex-col justify-center items-center"
                >
                  <AddUser HandleOpenAddUser={HandleOpenAddUser} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div
            className={`space-y-2 w-full ${modify || addUser ? "hidden" : ""}`}
          >
            <div className="text-mob-xl(headers+titles) font-bold mb-1">
              Membres de l&apos;espace
            </div>
            <div className="bg-blue-enedis h-1 top-0 w-full rounded-full" />
            <div className="space-y-2 overflow-auto h-36">
              {members.map((member: TUser) => (
                <div
                  key={member.id}
                  className="w-fit flex justify-start items-center overflow-hidden mb-2 mr-2"
                >
                  <div className="w-[30px] min-w-[30px] h-[30px] relative rounded-full overflow-hidden -mr-3">
                    <Image
                      alt={
                        `${
                          member.firstname
                        } ${member.lastname.toUpperCase()}` || "nom prénom"
                      }
                      src={member.imageUrl || "/profile_image.png"}
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

      <div
        className={
          modify || addUser
            ? "hidden"
            : "flex space-x-6 justify-center w-full m-3"
        }
      >
        <button
          onClick={HandleOpenAddUser}
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold"
        >
          J&apos;ajoute
        </button>
        <button
          onClick={HandleOpenModifyUser}
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold"
        >
          Je modifie
        </button>
      </div>
    </div>
  );
}

export default EspaceDescription;
