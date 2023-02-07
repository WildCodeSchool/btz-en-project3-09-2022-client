import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../../context/UserContext";
import { TSpace } from "../../../types/main";
import { spaceFetcher } from "../../../utils/fetcher";
import LoaderFocus from "../../structureShared/LoaderFocus";

function Espace() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["spaces", `user-${user?.id}`],
    () => spaceFetcher.getAll(),
    {}
  );

  if (!user) {
    return <div>Unauthorized</div>;
  }
  if (isLoading || !data) return <LoaderFocus />;

  return (
    <div className="w-full flex flex-col items-center mb-3 ">
      <div className="bg-green-enedis h-1 w-full top-0 mb-4 " />
      <div className="  text-mob-xl(headers+titles) font-bold mb-1">
        Mes espaces
      </div>
      <div className="bg-blue-enedis h-1 w-2/3 rounded-full mb-3" />
      <div className="w-full flex-x-center space-y-2 max-h-56 overflow-auto ">
        {data.map((space: TSpace) => (
          <Link href={`/space/${space.id}`} key={space.id} className="w-2/3">
            <div>
              <div className="w-full relative z-10">
                <img
                  src={space.imageUrl || "/site_image.png"}
                  alt={`Logo ${space.name}`}
                  className="rounded-lg object-center h-16 w-full rounded-select-mobile"
                />
                <div className="bg-blue-enedis h-16 w-full absolute z-20 top-0 left-0 mix-blend-hard-light opacity-[0.85] rounded-select-mobile">
                  {" "}
                  <p className="absolute centered-absolute text-white-enedis font-bold text-sm ">
                    {space.name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Espace;
