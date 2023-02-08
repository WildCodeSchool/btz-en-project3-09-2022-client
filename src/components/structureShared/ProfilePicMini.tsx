import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { userFetcher } from "../../utils/fetcher";
import LoaderFocus from "./LoaderFocus";

interface IProps {
  firstname: string;
  lastname: string;
  id: string;
}

function ProfilePicMini({ firstname, lastname, id }: IProps) {
  const { data: dataFreshUser, isLoading: isLoadingProfilePic } = useQuery(
    ["freshProfilePic", id],
    () => userFetcher.getOne(id)
  );

  if (isLoadingProfilePic || !dataFreshUser) return <LoaderFocus />;

  const { imageUrl: freshImageUrl } = dataFreshUser;

  return (
    <Link
      href={`/profile/${id}`}
      className="w-[30px] min-w-[30px] h-[30px] relative rounded-full overflow-hidden"
    >
      <Image
        alt={`${firstname} ${lastname.toUpperCase()}`}
        src={freshImageUrl || "/profile_image.svg"}
        fill
        className="object-cover"
      />
    </Link>
  );
}

export default ProfilePicMini;
