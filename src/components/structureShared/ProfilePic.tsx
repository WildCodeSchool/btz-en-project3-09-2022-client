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

function ProfilePic({ firstname, lastname, id }: IProps) {
  const { data: dataFreshUser, isLoading: isLoadingProfilePic } = useQuery(
    ["freshProfilePic", id],
    () => userFetcher.getOne(id)
  );

  if (isLoadingProfilePic || !dataFreshUser) return <LoaderFocus />;

  const { imageUrl: freshImageUrl } = dataFreshUser;

  return (
    <Link
      href={`/profile/${id}`}
      className="w-[40px] min-w-[40px] h-[40px] relative rounded-full overflow-hidden"
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

export default ProfilePic;
