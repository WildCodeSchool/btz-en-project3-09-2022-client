import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  firstname: string;
  lastname: string;
  imageUrl: string;
  id: string;
  ownerId?: string;
};

function TextTeamMemberCapsuleBlueStroked({
  id,
  firstname,
  lastname,
  imageUrl,
  ownerId,
}: Props) {
  return (
    <div className="w-fit flex justify-start items-center overflow-hidden mb-2 mr-2 relative">
      <div
        className={`w-[30px] min-w-[30px] h-[30px] relative rounded-full overflow-hidden -mr-3 ${
          ownerId &&
          id === ownerId &&
          "box-content border-[3px] border-blue-enedis"
        }`}
      >
        <Image
          alt={`${firstname} ${lastname.toUpperCase()}` || "nom prénom"}
          src={imageUrl || "/profile_image.png"}
          fill
          className="object-cover"
        />
      </div>
      <Link href={`/profile/${id}`} className="w-fit max-w-[calc(100%-18px)]">
        <div className="rounded-full border border-blue-enedis px-4 py-[6px]">
          <p className="text-mob-xs(textPost) truncate scrollbar-hide hover:text-clip hover:overflow-x-visible md:text-desk-sm(textPost+multiuse) relative">
            {firstname} {lastname.toUpperCase()}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default TextTeamMemberCapsuleBlueStroked;
