import React from "react";
import { useAuth } from "../../../context/UserContext";
import TextCampusCapsuleBlueStroked from "./TextCampusCapsuleBlueStroked";
import MyProfileLeftBar from "../Shared/MyProfileLeftBar";
import TitleSection from "../../structureShared/TitleSection";
import TeamMembersList from "../Shared/TeamMembersList";

function LeftBar() {
  const { user } = useAuth();

  return (
    <div className="w-[25%] hidden md:flex-x-center min-w-[230px] bg-background-enedis">
      <div className="w-[82%] mb-20">
        <MyProfileLeftBar />
        <TitleSection titleText="Mon site" />
        <TextCampusCapsuleBlueStroked
          city={user?.workLocation ? user?.workLocation : "Aucun"}
        />
        <TitleSection titleText="Mon équipe" />
        <TeamMembersList />
      </div>
    </div>
  );
}

export default LeftBar;
