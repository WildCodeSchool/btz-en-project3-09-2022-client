import React from "react";
import TextCampusCapsuleBlueStroked from "../campus/TextCampusCapsuleBlueStroked";
import MyProfileLeftBar from "../profil/MyProfileLeftBar";
import TitleSection from "../structure/TitleSection";
import TeamMembersList from "../teams/TeamMembersList";

function LeftBar() {
  const myWorkLocation = "Nantes";

  return (
    <div className="w-1/3 min-w-[200px] bg-background-enedis flex-x-center">
      <div className="w-[85%] ">
        <MyProfileLeftBar />
        <TitleSection titleText="Mon site" />
        <TextCampusCapsuleBlueStroked city={myWorkLocation} />
        <TitleSection titleText="Mon équipe" />
        <TeamMembersList />
      </div>
    </div>
  );
}

export default LeftBar;
