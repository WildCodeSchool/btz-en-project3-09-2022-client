import React, { useRef, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useAuth } from "../../../context/UserContext";
import { userFetcher } from "../../../utils/fetcher";
import Loader from "../../structureShared/Loader";
import { TUser } from "../../../types/main";

type THandleOpenAddUser = {
  HandleOpenAddUser: () => void;
};

function AddUser({ HandleOpenAddUser }: THandleOpenAddUser) {
  const [selectedUser, setSelectedUser] = useState("");
  const [isUsersListOpen, setIsUSersListOpen] = useState(false);
  const { user: userConnected } = useAuth();
  const {
    query: { spaceId },
  } = useRouter();

  const ref = useRef<HTMLDivElement>(null);

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
  return (
    <div className="bg-green-enedis w-screen h-full p-2 ">
      <div className="bg-background-enedis flex-all-center rounded-app-bloc w-full p-2 ">
        <p className="text-mob-sm(multiuse) pb-2">
          Je veux ajouter un membre :{" "}
        </p>
        <div className=" w-full left-16 flex-all-center" ref={ref}>
          {isUsersListOpen && (
            <div className="w-[80%] flex flex-col bg-blue-enedis rounded-app-bloc h-60 overflow-auto -mb-12 pb-10 pt-4">
              {data.length > 0 &&
                data
                  .filter(
                    (user: TUser) =>
                      user.lastname.toLowerCase().includes(selectedUser) ||
                      user.firstname.toLowerCase().includes(selectedUser)
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
                              src={user.imageUrl || "/profile_image.svg"}
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
                      )
                  )}
            </div>
          )}
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
                onChange={(e) => setSelectedUser(e.target.value)}
                onClick={handleUsersList}
              />
            </div>
          </div>
          <button
            onClick={HandleOpenAddUser}
            type="button"
            className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold"
          >
            Je valide
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
