import Image from "next/image";
import React from "react";

type Props = { firstname: string; lastname: string; imageUrl: string };

function TextTeamMemberCapsuleBlueStroked({
  firstname,
  lastname,
  imageUrl,
}: Props) {
  return (
    <div className="w-fit flex justify-start items-center overflow-hidden mb-2 mr-2">
      <div className="w-[30px] min-w-[30px] h-[30px] relative rounded-full overflow-hidden -mr-3">
        <Image
          alt={`${firstname} ${lastname.toUpperCase()}` || "nom prénom"}
          src={imageUrl || "/profile_image.png"}
          fill
          className="object-cover"
        />
      </div>
      <div className="w-fit max-w-[calc(100%-18px)] rounded-full border border-blue-enedis px-4 py-[6px]">
        <p className="text-mob-xs(textPost) truncate scrollbar-hide hover:text-clip hover:overflow-x-visible md:text-desk-sm(textPost+multiuse)">
          {firstname} {lastname.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default TextTeamMemberCapsuleBlueStroked;
