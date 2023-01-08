import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Image from "next/image";
import useModal from "./modal/useModal";

import Modal from "./modal/Modal";

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

function SearchBar() {
  const [selectedUser, setSelectedUser] = useState("");

  const { isShowing, toggle } = useModal();

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const user = await axios.get(`http://localhost:4000/api/v1/users`);
      return user.data;
    } catch (error) {
      return error;
    }
  };

  const { isLoading, data: users, error } = useQuery("users", getAllUsers);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>Something bad happen</p>;
  }

  const width = 760;

  //    mobile :  "flex bg-green-enedis text-white-enedis rounded-select-mobile z-40 flex-col absolute top-20 right-16 w-1/3 md:w-[252px] md:ml-0 ml-[-30px] h-60 overflow-scroll "
  // desk : "flex bg-green-enedis text-white-enedis rounded-select-mobile z-40 flex-col absolute top-16 right-20 w-5/6  ml-[-30px] h-60 overflow-scroll "

  return (
    <div className="flex items-center w-full">
      <Modal isShowing={isShowing} hide={toggle}>
        {users.length > 0 &&
          users
            .filter(
              (user: TUser) =>
                user.lastname.toLowerCase().includes(selectedUser) ||
                user.firstname.toLowerCase().includes(selectedUser)
            )
            .map((user: TUser) => (
              <span>
                {user.firstname} {user.lastname}
              </span>
            ))}
      </Modal>
      {width > 380 ? (
        <input
          type="select"
          className="absolute right-[75px]   h-[45px] rounded-full text-center w-1/3 placeholder "
          placeholder="Rechercher..."
          onChange={(e) => setSelectedUser(e.target.value)}
          onClick={toggle}
        />
      ) : (
        <div className="relative  min-w-[50%] flex justify-between items-center  ">
          <input
            className="w-[86%] h-[40px] rounded-full text-center "
            placeholder="Rechercher sur Enedis Share..."
            onChange={(e) => setSelectedUser(e.target.value)}
          />

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
