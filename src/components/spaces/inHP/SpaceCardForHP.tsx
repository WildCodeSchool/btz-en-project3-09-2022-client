import { useRouter } from "next/router";
import React from "react";
import { TSpace } from "../../../types/main";
import PostDisplay from "../../posts/structurePost/displayPost/PostDisplay";
import CTA from "../../structureShared/CTA";
import HeaderSpaceHP from "./HeaderSpaceHP";

interface IProps {
  oneSpace: TSpace;
}

function SpaceCardForHP({ oneSpace }: IProps) {
  const router = useRouter();

  return (
    <div className="w-full mb-9 lg:w-[48%] lg:min-w-[360px]">
      <div className="h-[360px] bg-background-enedis mb-3 md:h-[375px]">
        <HeaderSpaceHP oneSpace={oneSpace} />
        <PostDisplay oneSpace={oneSpace} />
      </div>
      <CTA
        text="Je veux en voir plus !"
        action={() => {
          router.push(`space/${oneSpace.id}`);
        }}
      />
    </div>
  );
}

export default SpaceCardForHP;
