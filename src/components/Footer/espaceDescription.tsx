/* eslint-disable @typescript-eslint/return-await */
import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ModifyUser from "./ModifyUser";
import { useAuth } from "../../context/UserContext";
import AddUser from "./AddUser";

function EspaceDescription() {
  const { user } = useAuth();
  const [modify, setModify] = useState(false);
  const [addUser, setAddUser] = useState(false);

  const HandleOpenModifyUser = () => {
    setModify(!modify);
  };

  const HandleOpenAddUser = () => {
    setAddUser(!addUser);
  };

  return (
    <div className="bg-background-enedis flex-all-center w-full">
      <div className="bg-green-enedis h-1 top-0 w-full mb-6" />
      <div className="w-3/4">
        <div className="flex-all-center">
          <div className="text-mob-xl(headers+titles) font-bold mb-1">
            Description de l&apos;espace
          </div>
          <div className="bg-blue-enedis h-1 top-0 w-full rounded-full" />
          <p className="text-mob-xs(textPost) m-3 w-full">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore ea
            aperiam, quas dicta repellendus quaerat earum in minus cumque?
          </p>
          {modify && (
            <AnimatePresence>
              <motion.div
                exit={{ y: -280 }}
                initial={{ y: -280 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
                className="h-2/3 w-full bg-green-enedis z-50 flex flex-col justify-center items-center"
              >
                <ModifyUser HandleOpenModifyUser={HandleOpenModifyUser} />
              </motion.div>
            </AnimatePresence>
          )}

          {addUser && (
            <AnimatePresence>
              <motion.div
                exit={{ y: -280 }}
                initial={{ y: 280 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-2/3 w-full bg-green-enedis z-50 flex flex-col justify-center items-center"
              >
                <AddUser HandleOpenAddUser={HandleOpenAddUser} />
              </motion.div>
            </AnimatePresence>
          )}

          <div className={modify || addUser ? "hidden" : ""}>
            <div className="text-mob-xl(headers+titles) font-bold mb-1">
              Membres de l&apos;espace
            </div>

            <div className="bg-blue-enedis h-1 top-0 w-full rounded-full " />
            <div className="flex m-3">
              <div className="border border-blue-enedis rounded-full h-fit  w-fit text-mob-sm(multiuse) relative flex items-center px-2 mx-1">
                {user?.firstname} {user?.lastname}
              </div>
              <Image
                src="/logo_enedis/Logo_moderateur.svg"
                alt="logo du moderateur"
                width={18}
                height={18}
                className=""
              />
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
