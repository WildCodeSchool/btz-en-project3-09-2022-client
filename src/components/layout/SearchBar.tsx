import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { userFetcher } from "../../utils/fetcher";

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
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: (isSearchBarOpen: boolean) => void;
};

function SearchBar({ width, isSearchBarOpen, setIsSearchBarOpen }: TProps) {
  const [selectedUser, setSelectedUser] = useState("");
  const [isUsersListOpen, setIsUSersListOpen] = useState(false);

  // Fetch all users

  const { data, isLoading } = useQuery(["users"], () => userFetcher.getAll());

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  // handlers
  const handleUsersList = () => {
    setIsUSersListOpen(!isUsersListOpen);
  };

  const handleSearchBarOpen = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  return (
    <div className="flex items-center w-full ">
      {/* Mobile */}

      {width < 760 ? (
        <div className="relative  min-w-[50%] flex justify-between items-center mr-6">
          <input
            type="select"
            className=" w-full  h-[45px] rounded-full text-center  placeholder "
            placeholder="Rechercher..."
            onChange={(e) => setSelectedUser(e.target.value)}
            onClick={handleUsersList}
          />
          {isUsersListOpen && (
            <div className="flex flex-col absolute top-14  py-6 border-4 border-green-enedis w-full px-4">
              {data.length > 0 &&
                data
                  .filter(
                    (user: TUser) =>
                      user.lastname.toLowerCase().includes(selectedUser) ||
                      user.firstname.toLowerCase().includes(selectedUser)
                  )
                  .map((user: TUser) => (
                    <div className="flex ">
                      <Image
                        src={user.imageUrl}
                        width={100}
                        height={100}
                        alt="profile"
                        className="rounded-full w-[30px] h-[30px]  border-white-enedis space-5-5"
                      />
                      <span className="text-dark-enedis w-full">
                        {user.firstname} {user.lastname}
                      </span>
                    </div>
                  ))}
            </div>
          )}
        </div>
      ) : (
        // Desktop
        <div className="relative  min-w-[50%] flex justify-between items-center  ">
          <input
            className="w-[86%] h-[40px] rounded-full text-center "
            placeholder="Rechercher sur Enedis Share..."
            onChange={(e) => setSelectedUser(e.target.value)}
            onClick={handleUsersList}
          />
          {isUsersListOpen && (
            <div className="flex flex-col absolute top-14 py-6 border-4 border-green-enedis w-full px-4">
              {data.length > 0 &&
                data
                  .filter(
                    (user: TUser) =>
                      user.lastname.toLowerCase().includes(selectedUser) ||
                      user.firstname.toLowerCase().includes(selectedUser)
                  )
                  .map((user: TUser) => (
                    <div className="flex items-center">
                      <Image
                        src={user.imageUrl}
                        width={100}
                        height={100}
                        alt="profile"
                        className="rounded-full w-[30px] h-[30px] border border-white-enedis space-5-5"
                      />
                      <span className="text-dark-enedis w-full">
                        {user.firstname} {user.lastname}
                      </span>
                    </div>
                  ))}
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
