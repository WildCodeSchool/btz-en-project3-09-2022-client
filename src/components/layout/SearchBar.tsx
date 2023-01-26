import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { userFetcher } from "../../utils/fetcher";
import { useAuth } from "../../context/UserContext";
import useOnClickOutside from "../hooks/useOnClickOutside";

type TUser = {
  id: string;
  role: string;
  firstname: string;
  lastname: string;
  birthday: Date;
  createdAt: Date;
  email: string;
  imageUrl: string;
  isDisabled: boolean;
  teamId: string;
  updatedAt: Date;
  workLocation: string;
};

type TProps = {
  width: number;
};

function SearchBar({ width }: TProps) {
  const [selectedUser, setSelectedUser] = useState("");
  const [isUsersListOpen, setIsUSersListOpen] = useState(false);
  const { user: userConnected } = useAuth();

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsUSersListOpen(false));

  if (typeof window === "undefined") return null;
  // Fetch all users

  const { data, isLoading } = useQuery(["users"], () => userFetcher.getAll());

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  // handlers
  const handleUsersList = () => {
    if (!isUsersListOpen) {
      setIsUSersListOpen(true);
    }
  };

  return (
    <div className="flex items-center w-full">
      {/* Mobile */}

      {width < 760 ? (
        <div
          className="relative w-full flex justify-between items-center mr-6"
          ref={ref}
        >
          <input
            type="select"
            className=" w-full  h-[45px] rounded-full text-center placeholder "
            placeholder="Rechercher..."
            onChange={(e) => setSelectedUser(e.target.value)}
            onClick={handleUsersList}
          />
          {isUsersListOpen && (
            <div className="flex flex-col absolute top-16 -right-5 py-6 bg-blue-enedis w-[300%] max-w-[300px] rounded-b-app-bloc px-4 z-50 shadow-xl border h-[410px] overflow-y-scroll truncate">
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
                        <div className="flex w-full items-center mb-2">
                          <div className="h-[40px] w-[40px] min-w-[40px] min-h-[40px] relative">
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
        </div>
      ) : (
        // Desktop
        <div
          className="relative  min-w-[50%] flex justify-between items-center  "
          ref={ref}
        >
          <input
            className="w-[86%] h-[40px] rounded-full text-center "
            placeholder="Rechercher sur Enedis Share..."
            onChange={(e) => setSelectedUser(e.target.value)}
            onClick={handleUsersList}
          />
          {isUsersListOpen && (
            <div className="flex flex-col absolute top-16 py-6 bg-blue-enedis w-full px-4 rounded-b-app-bloc z-50  shadow-xl border h-[410px] overflow-y-scroll truncate">
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
                        <div className="flex items-center w-2/3 m-auto  pb-2">
                          <div className="h-[40px] w-[40px] min-w-[40px] min-h-[40px] relative">
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
                          <Link href={`/profile/${user.id}`}>
                            <p className="text-white-enedis w-full  font-enedis text-left ml-5 ">
                              {user.firstname} {user.lastname.toUpperCase()}
                              <br />
                              <span>{user.workLocation}</span>
                            </p>
                          </Link>
                        </div>
                      )
                  )}
            </div>
          )}

          <Image
            src="/assets/ENEDIS_PICTO_003_Search_BLANC_EXE.png"
            width={1000}
            height={1000}
            alt="search-picto"
            className="   w-[45px] h-[45px] rounded-full flex justify-center items-center z-10 "
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
