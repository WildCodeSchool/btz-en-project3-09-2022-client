import Image from "next/image";
import React from "react";

interface IProps {
  firstname: string;
  lastname: string;
  imageUrl: string;
}

function ProfilePic({ firstname, lastname, imageUrl }: IProps) {
  return (
    <div className="w-[40px] min-w-[40px] h-[40px] relative rounded-full overflow-hidden">
      <Image
        alt={`${firstname} ${lastname.toUpperCase()}`}
        src={imageUrl}
        fill
        className="object-cover"
      />
    </div>
  );
}

export default ProfilePic;
