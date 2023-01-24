import React from "react";
import { useAuth } from "../../../context/UserContext";
import { TSpace } from "../../../types/main";
import HeaderSpaceHP from "./HeaderSpaceHP";

interface IProps {
  oneSpace: TSpace;
}

function SpaceCardForHP({ oneSpace }: IProps) {
  const { user } = useAuth();
  return (
    <div className="h-[410px] md:[425px]">
      <div className="">
        <HeaderSpaceHP oneSpace={oneSpace} />
      </div>
    </div>
  );
}

export default SpaceCardForHP;
