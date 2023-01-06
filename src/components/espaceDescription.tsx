/* eslint-disable @typescript-eslint/return-await */
import React from "react";
import { useQuery } from "react-query";
import { userFetcher } from "../utils/fetcher";

function EspaceDescription() {
  const { isLoading, error, data } = useQuery(
    ["getUser", "c2a3c1e8-c588-4090-8e75-e328b85f5107"],
    () => userFetcher.getOne("c2a3c1e8-c588-4090-8e75-e328b85f5107")
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>Sorry something went wrong</p>;
  }

  return (
    <div className="bg-background-enedis flex-all-center w-full">
      <div className="bg-green-enedis h-1 top-0 w-full mb-6" />
      <div className="w-2/3">
        <div>Description de l&apos;espace</div>
        <div className="bg-blue-enedis h-1 top-0 w-full rounded-full " />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore ea
          aperiam, quas dicta repellendus quaerat earum in minus cumque? Saepe
          magni accusamus vero quam veniam ipsam consectetur soluta eaque amet.
        </p>

        <div>Membres de l&apos;equipe</div>
        <div className="bg-blue-enedis h-1 top-0 w-full rounded-full " />
      </div>
      <div>
        <button
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 "
        >
          J&apos;ajoute
        </button>
        <button
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 "
        >
          Je valide
        </button>
      </div>
    </div>
  );
}

export default EspaceDescription;
