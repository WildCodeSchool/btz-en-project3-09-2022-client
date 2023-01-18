import React from "react";
import { useAuth } from "../../context/UserContext";
import TextCampusCapsuleBlueStroked from "../campus/TextCampusCapsuleBlueStroked";
import MyProfileLeftBar from "../profil/MyProfileLeftBar";
import TitleSection from "../structure/TitleSection";
import TeamMembersList from "../teams/TeamMembersList";

function LeftBar() {
  const { user } = useAuth();

  return (
    <div className="w-1/3 hidden md:flex-x-center min-w-[200px] bg-background-enedis h-screen sticky flex-x-center mx-auto">
      <div className="w-[85%] mb-20">
        {/* <MyProfileLeftBar />
        <TitleSection titleText="Mon site" /> */}
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
