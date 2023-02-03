import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  firstname: string;
  lastname: string;
  imageUrl: string;
  id: string;
}

function ProfilePic({ firstname, lastname, imageUrl, id }: IProps) {
  return (
    <Link
      href={`/profile/${id}`}
      className="w-[30px] min-w-[40px] h-[40px] relative rounded-full overflow-hidden"
    >
      <Image
        alt={`${firstname} ${lastname.toUpperCase()}`}
        src={imageUrl || "/profile_image.svg"}
        fill
        className="object-cover"
      />
    </Link>
  );
}

export default ProfilePic;
