import React, { ChangeEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Loader from "../../structureShared/Loader";
import { TUser } from "../../../types/main";
import { categoryFetcher, userFetcher } from "../../../utils/fetcher";
import { useModalContextMembers } from "../../../context/ModalContextCutUserCategory";

function CutUser() {
  const modalContext = useModalContextMembers();
  const [onSearch, setOnSearch] = useState("");
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [isUsersListOpen, setIsUSersListOpen] = useState(false);
  const {
    query: { spaceId, categoryId },
  } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const client = useQueryClient();
  useOnClickOutside(ref, () => setIsUSersListOpen(false));

  // Fetch all users

  const { data: allMembersInSpace, isLoading } = useQuery(
    ["users", spaceId],
    () => userFetcher.getAllBySpace({ spaceId: spaceId as string })
  );

  const {
    data: allMembersInCategory,
    isLoading: isLoadingAllMembersInCategory,
  } = useQuery(["allMembersInCategory", categoryId], () =>
    userFetcher.getAllByCategory(categoryId as string)
  );

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery(
    ["category", categoryId],
    () => categoryFetcher.getOne(categoryId as string)
  );

  if (
    isLoading ||
    isLoadingAllMembersInCategory ||
    isLoadingCategory ||
    !allMembersInSpace ||
    !allMembersInCategory ||
    !dataCategory
  ) {
    return <Loader />;
  }

  // handlers
  const handleUsersList = () => {
    if (!isUsersListOpen) {
      setIsUSersListOpen(true);
    }
  };

  const handleSubmit = async () => {
    await categoryFetcher
      .removeUserToCategory(categoryId as string, checkedUsers)
      .then(() => {
        client.invalidateQueries(["allMembersInCategory", categoryId]);
        client.invalidateQueries(["users", categoryId]);
        client.invalidateQueries([`membersInCategory`, categoryId]);
        modalContext?.handleClose();
      });
  };

  const isChecked = (id: string) => {
    const index = checkedUsers.findIndex((item) => item === id);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleCheckboxes = (e: ChangeEvent<HTMLInputElement>) => {
    const isAllreadyChecked = isChecked(e.target.value);

    if (isAllreadyChecked) {
      return setCheckedUsers((state) =>
        state.filter((id) => id !== e.target.value)
      );
    }

    return setCheckedUsers((state) => [...state, e.target.value]);
  };

  const dataFiltered = allMembersInSpace
    .filter((user) =>
      allMembersInCategory.some((member) => member.id === user.id)
    )
    .filter((user) => user.id !== dataCategory.ownerId)
    .filter(
      (user: TUser) =>
        user.lastname.toLowerCase().includes(onSearch) ||
        user.firstname.toLowerCase().includes(onSearch)
    );

  if (typeof window === "undefined") return <div>No window on the server</div>;

  return (
    <div className="bg-green-enedis w-full h-full p-2 ">
      <div className="bg-background-enedis flex-all-center rounded-app-bloc w-full p-2 ">
        <p className="text-desk-md(titlePubli+multiuse) pb-2 mb-3 mt-3">
          Je veux <b className="text-redError-enedis">retirer</b> un membre :{" "}
        </p>

        <form className=" w-full left-16 flex-all-center z-50">
          <AnimatePresence>
            {isUsersListOpen && (
              <motion.div
                ref={ref}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-[80%] flex flex-col bg-blue-enedis rounded-app-bloc h-fit max-h-60 overflow-auto -mb-12 pb-10 p-4 -z-10"
              >
                {dataFiltered.length > 0 ? (
                  dataFiltered.map((user: TUser) => (
                    <div
                      className="flex w-full items-center mb-2 h-fit"
                      key={user.id}
                    >
                      <div className="h-[40px] w-[40px] min-w-[40px] min-h-[40px] relative ">
                        <Image
                          src={user.imageUrl || "/profile_image.png"}
                          fill
                          alt={
                            `${
                              user.firstname
                            } ${user.lastname.toUpperCase()}` || "nom prénom"
                          }
                          className="rounded-full object-cover border-white-enedis"
                        />
                      </div>
                      <div className="w-3/5">
                        <p className="text-white-enedis w-full font-enedis text-left ml-5 ">
                          {user.firstname} {user.lastname.toUpperCase()}
                          <br />
                          <span className="text-desk-sm(textPost+multiuse)">
                            {user.workLocation}
                          </span>
                        </p>
                      </div>
                      <div className="w-1/3 justify-end flex">
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          defaultChecked={false}
                          onChange={handleCheckboxes}
                          checked={isChecked(user.id)}
                          value={user.id}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-white-enedis text-mob-sm(multiuse)">
                    Pour le moment, vous êtes seul dans cette catégorie...{" "}
                    <br />
                    ajoutez des membres !{" "}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="bg-blue-enedis rounded-full h-10 m-5 w-[80%] z-50">
            <div className="flex items-center p-1 h-10 w-full justify-center">
              <Image
                src="/logo_enedis/picto_search_white.svg"
                alt=" recherche"
                width={10}
                height={10}
                className="w-9 h-8"
              />
              <input
                type="text"
                className="w-full rounded-full h-8 px-5"
                placeholder="Rechercher..."
                onChange={(e) => setOnSearch(e.target.value)}
                onClick={handleUsersList}
              />
            </div>
          </div>
          <div className="w-full flex space-x-4 items-center justify-center mb-5">
            <button
              onClick={handleSubmit}
              type="button"
              className="w-fit max-w-full rounded-full bg-redError-enedis text-white-enedis text-mob-md(CTA+input) px-5 py-4
            md:py-3 md:px-5 md:text-desk-lg(CTA+input)"
            >
              Je retire
            </button>
            <button
              onClick={modalContext?.handleClose}
              type="button"
              className="w-fit font-regular text-mob-md(CTA+input)
            md:py-3 md:px-5 md:text-desk-lg(CTA+input)"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CutUser;
