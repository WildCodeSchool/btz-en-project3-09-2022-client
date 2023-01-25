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
};

function SearchBar({ width }: TProps) {
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

  return (
    <div className="flex items-center w-full ">
      {/* Mobile */}

      {width < 760 ? (
        <div className="relative w-full flex justify-between items-center mr-6">
          <input
            type="select"
            className=" w-full  h-[45px] rounded-full text-center placeholder "
            placeholder="Rechercher..."
            onChange={(e) => setSelectedUser(e.target.value)}
            onClick={handleUsersList}
          />
          {isUsersListOpen && (
            <div className="flex flex-col absolute top-16 -right-5 py-6 bg-blue-enedis w-[300%] max-w-[300px] rounded-b-app-bloc px-4 z-50 border-x-4 border-b-4 border-green-enedis">
              {data.length > 0 &&
                data
                  .filter(
                    (user: TUser) =>
                      user.lastname.toLowerCase().includes(selectedUser) ||
                      user.firstname.toLowerCase().includes(selectedUser)
                  )
                  .map((user: TUser) => (
                    <div className="flex w-full items-center justify-center mb-2">
                      <Image
                        src={user.imageUrl || "/profile_image.png"}
                        width={100}
                        height={100}
                        alt="profile"
                        className="rounded-full w-[30px] h-[30px]  border-white-enedis space-5-5"
                      />
                      <span className="text-white-enedis w-full">
                        {user.firstname} {user.lastname.toUpperCase()}
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
            <div className="flex flex-col absolute top-16 py-6 bg-blue-enedis w-full px-4 rounded-b-app-bloc z-50 border-x-4 border-b-4 border-green-enedis">
              {data.length > 0 &&
                data
                  .filter(
                    (user: TUser) =>
                      user.lastname.toLowerCase().includes(selectedUser) ||
                      user.firstname.toLowerCase().includes(selectedUser)
                  )
                  .map((user: TUser) => (
                    <div className="flex items-center w-2/3 m-auto  pb-2">
                      <Image
                        src={user.imageUrl || "/profile_image.png"}
                        width={100}
                        height={100}
                        alt="profile"
                        className="rounded-full w-[30px] h-[30px] border border-white-enedis "
                      />
                      <span className="text-white-enedis w-full">
                        {user.firstname} {user.lastname.toUpperCase()}
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
