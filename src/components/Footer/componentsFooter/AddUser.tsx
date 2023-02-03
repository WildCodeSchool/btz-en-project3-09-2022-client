import React, { ChangeEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useAuth } from "../../../context/UserContext";
import Loader from "../../structureShared/Loader";
import { TUser } from "../../../types/main";
import { categoryFetcher, userFetcher } from "../../../utils/fetcher";

function AddUser() {
  const [onSearch, setOnSearch] = useState("");
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [isUsersListOpen, setIsUSersListOpen] = useState(false);
  const { user: userConnected } = useAuth();
  const {
    query: { spaceId, categoryId },
  } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const client = useQueryClient();
  useOnClickOutside(ref, () => setIsUSersListOpen(false));

  if (typeof window === "undefined") return null;
  // Fetch all users

  const { data, isLoading } = useQuery(["users", spaceId], () =>
    userFetcher.getAllBySpace({ spaceId: spaceId as string })
  );

  if (isLoading || !data) {
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
      .addUserToCategory(categoryId as string, checkedUsers)
      .then(() => {
        client.invalidateQueries(["users", spaceId]);
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

  return (
    <div className="bg-green-enedis w-screen h-full p-2 ">
      <div className="bg-background-enedis flex-all-center rounded-app-bloc w-full p-2 ">
        <p className="text-mob-sm(multiuse) pb-2">
          Je veux ajouter un membre :{" "}
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
                className="w-[80%] flex flex-col bg-blue-enedis rounded-app-bloc h-60 overflow-auto -mb-12 pb-10 p-4 -z-10"
              >
                {data.length > 0 &&
                  data
                    .filter(
                      (user: TUser) =>
                        user.lastname.toLowerCase().includes(onSearch) ||
                        user.firstname.toLowerCase().includes(onSearch)
                    )
                    .map(
                      (user: TUser) =>
                        user.id !== userConnected?.id && (
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
                                  } ${user.lastname.toUpperCase()}` ||
                                  "nom prénom"
                                }
                                className="rounded-full object-cover border-white-enedis"
                              />
                            </div>
                            <div className="w-3/5">
                              <Link href={`/profile/${user.id}`}>
                                <p className="text-white-enedis w-full font-enedis text-left ml-5 ">
                                  {user.firstname} {user.lastname.toUpperCase()}
                                  <br />
                                  <span className="text-desk-sm(textPost+multiuse)">
                                    {user.workLocation}
                                  </span>
                                </p>
                              </Link>
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
                        )
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
                className="w-full rounded-full h-8"
                placeholder="Rechercher..."
                onChange={(e) => setOnSearch(e.target.value)}
                onClick={handleUsersList}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            type="button"
            className="w-fit max-w-full rounded-full bg-green-enedis text-white-enedis text-mob-md(CTA+input) px-5 py-4
            md:py-3 md:px-5 md:text-desk-lg(CTA+input)"
          >
            Je valide
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
