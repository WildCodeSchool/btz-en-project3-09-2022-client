/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../../context/UserContext";
import { TSpace } from "../../../types/main";
import { spaceFetcher } from "../../../utils/fetcher";
import Loader from "../../structureShared/Loader";

function NavigationSpaces() {
  const { user } = useAuth();

  const {
    data: dataSpaces,
    isLoading: isLoadingSpaces,
    error: errorSpaces,
  } = useQuery(["spaces", user!.id], () => spaceFetcher.getAll());

  if (!user) {
    return <div>Unauthorized</div>;
  }
  if (isLoadingSpaces || !dataSpaces)
    return (
      <div>
        <Loader />
      </div>
    );
  if (errorSpaces) return <div>Une erreur s&apos;est produite</div>;

  return (
    <div className="w-full flex-x-center space-y-2 overflow-auto">
      {dataSpaces.map((space: TSpace) => (
        <Link key={space.id} href={`${space.id}`} className="h-full w-full">
          <div className="w-full relative z-0 h-[70px] rounded-app-bloc overflow-hidden">
            <div className="w-full h-full bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-20" />
            <Image
              alt={space.name || "space name"}
              src={space.imageUrl || "/space_image.png"}
              fill
              className="object-cover relative z-10 min-h-full"
            />
            <div className="absolute z-30 centered-absolute w-full font-enedis text-white-enedis">
              <h1 className="text-desk-lg(CTA+input) font-bold">
                {space.name}
              </h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default NavigationSpaces;
