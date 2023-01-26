import React from "react";
import { TSpace } from "../../../types/main";
import PostDisplay from "../../posts/structurePost/displayPost/PostDisplay";
import CTA from "../../structure/CTA";
import HeaderSpaceHP from "./HeaderSpaceHP";

interface IProps {
  oneSpace: TSpace;
}

function SpaceCardForHP({ oneSpace }: IProps) {
  return (
    <div className="w-full mb-9 lg:w-[48%]">
      <div className="h-[360px] bg-background-enedis mb-3 md:h-[375px]">
        <HeaderSpaceHP oneSpace={oneSpace} />
        <PostDisplay oneSpace={oneSpace} />
      </div>
      <CTA text="Je veux en voir plus !" action={() => {}} />
    </div>
  );
}

export default SpaceCardForHP;
