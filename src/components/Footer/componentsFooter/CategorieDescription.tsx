/* eslint-disable @typescript-eslint/return-await */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryFetcher, userFetcher } from "../../../utils/fetcher";
import AddUser from "./AddUser";
import { TUser } from "../../../types/main";
import DeleteUser from "./DeleteUser";
import { useAuth } from "../../../context/UserContext";
import { categoryUpdater } from "../../../utils/updater";

interface IProps {
  setOpenCategorieDescription: (value: boolean) => void;
}

function CategorieDescription({ setOpenCategorieDescription }: IProps) {
  const router = useRouter();
  const { categoryId } = router.query;
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [cutUser, setCutUser] = useState(false);
  const [addUser, setAddUser] = useState(false);

  const handleDeleteCategory = async () => {
    const categoryDisabled = await categoryUpdater.disable(
      categoryId as string
    );
    // eslint-disable-next-line no-alert
    alert(`La catégorie ${categoryDisabled.name} a bien été supprimée`);
    setOpenCategorieDescription(false);
    router.push("/");
    queryClient.invalidateQueries(["getLatestPostBySpaceWithImage"]);
    queryClient.invalidateQueries([categoryDisabled.id]);
  };

  const { data, isLoading } = useQuery(["category", categoryId], () =>
    categoryFetcher.getOne(categoryId as string)
  );

  const { data: members, isLoading: membersLoading } = useQuery(
    ["users", categoryId],
    () => userFetcher.getAllByCategory(categoryId as string)
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
          <div className="text-mob-xl(headers+titles) font-bold mb-1">
            Description de la catégorie
          </div>
          <div className="bg-blue-enedis h-1 top-0 rounded-full w-full" />

          <p className="text-mob-xs(textPost) m-3 w-full text-left mb-5">
            {data.description}
          </p>
          {user && user.id === data.ownerId && (
            <button
              onClick={handleDeleteCategory}
              type="button"
              className="border-[1px] border-redError-enedis text-redError-enedis rounded-full px-5 h-10 w-fit text-mob-sm(multiuse) font-regular mb-8"
            >
              Je supprime la catégorie
            </button>
          )}

          <div>
            {cutUser && (
              <AnimatePresence>
                <motion.div
                  exit={{ y: -280 }}
                  initial={{ y: 280 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-2/3 w-full bg-green-enedis z-50 flex flex-col justify-center items-center"
                >
                  <DeleteUser setCutUser={setCutUser} />
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
                  <AddUser setAddUser={setAddUser} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div
            className={`space-y-2 w-full ${cutUser || addUser ? "hidden" : ""}`}
          >
            <div className="text-mob-xl(headers+titles) font-bold mb-1">
              Membres de la catégorie
            </div>

            <div className="bg-blue-enedis h-1 top-0 rounded-full w-full" />
            <div className="space-y-2">
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

      <div
        className={
          cutUser || addUser
            ? "hidden"
            : "flex space-x-6 justify-center w-full m-3"
        }
      >
        <button
          onClick={() => setAddUser(true)}
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold mb-5"
        >
          J&apos;ajoute
        </button>
        <button
          onClick={() => setCutUser(true)}
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold mb-5"
        >
          Je retire
        </button>
      </div>
    </div>
  );
}

export default CategorieDescription;
