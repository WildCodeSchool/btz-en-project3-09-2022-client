/* eslint-disable @typescript-eslint/return-await */
import React from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { userFetcher } from "../utils/fetcher";

function EspaceDescription() {
  const { isLoading, error, data } = useQuery(
    ["getUser", "c2a3c1e8-c588-4090-8e75-e328b85f5107"],
    () => userFetcher.getOne("c2a3c1e8-c588-4090-8e75-e328b85f5107")
  );

  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>Sorry something went wrong</p>;
  }

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

          <div className="text-mob-xl(headers+titles) font-bold mb-1">
            Membres de l&apos;espace
          </div>
          <div className="bg-blue-enedis h-1 top-0 w-full rounded-full " />
          <div className="flex m-3">
            <div className="border border-blue-enedis rounded-full h-fit  w-fit text-mob-sm(multiuse) relative flex items-center px-2 mx-1">
              {data.firstname} {data.lastname}
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

      <div className="flex space-x-6 justify-center w-full m-3">
        <button
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold "
        >
          J&apos;ajoute
        </button>
        <button
          type="button"
          className="text-white-enedis bg-green-enedis rounded-full px-2 h-10 w-28 text-mob-md(CTA+input) font-bold "
        >
          Je modifie
        </button>
      </div>
    </div>
  );
}

export default EspaceDescription;
