/* eslint-disable @typescript-eslint/return-await */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    () => userFetcher.getAllBySpace(spaceId as string)
  );

  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }

  if (membersLoading || !members) {
    return <h2>Loading...</h2>;
  }
  console.log(members);
  return (
    <div className="bg-background-enedis flex-all-center w-full">
      <div className="bg-green-enedis h-1 top-0 w-full mb-6" />
      <div className="w-3/4">
        <div className="flex-all-center">
          <div className="text-mob-xl(headers+titles) font-bold mb-1">
            Description de l&apos;espace
          </div>
          <div className="bg-blue-enedis h-1 top-0 w-full rounded-full" />
          <p className="text-mob-xs(textPost) m-3 w-full">{data.description}</p>
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

          <div className={`space-y-2 ${modify || addUser ? "hidden" : ""}`}>
            <div className="text-mob-xl(headers+titles) font-bold mb-1">
              Membres de l&apos;espace
            </div>
            <div className="bg-blue-enedis h-1 top-0 w-full rounded-full " />
            <div className="space-y-2">
              {members.map((member: TUser) => (
                <p
                  key={member.id}
                  className="border border-blue-enedis rounded-full h-fit  w-fit text-mob-sm(multiuse) px-2 "
                >
                  {member.firstname} {member.lastname}
                </p>
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
