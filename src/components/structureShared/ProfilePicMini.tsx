import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  firstname: string;
  lastname: string;
  imageUrl: string;
  id: string;
}

function ProfilePicMini({ firstname, lastname, imageUrl, id }: IProps) {
  return (
    <Link
      href={`/profile/${id}`}
      className="w-[30px] min-w-[30px] h-[30px] relative rounded-full overflow-hidden"
    >
      <Image
        alt={`${firstname} ${lastname.toUpperCase()}`}
        src={imageUrl}
        fill
        className="object-cover"
      />
    </Link>
  );
}

export default ProfilePicMini;
