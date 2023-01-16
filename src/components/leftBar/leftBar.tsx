import React from "react";
import { useAuth } from "../../context/UserContext";
import TextCampusCapsuleBlueStroked from "../campus/TextCampusCapsuleBlueStroked";
import MyProfileLeftBar from "../profil/MyProfileLeftBar";
import TitleSection from "../structure/TitleSection";
import TeamMembersList from "../teams/TeamMembersList";

function LeftBar() {
  const { user } = useAuth();

  // if (!user) {
  //   return <div>Bonjour</div>;
  // }

  return (
    <div className="w-1/3 min-w-[200px] bg-background-enedis flex-x-center">
      <div className="w-[85%] mb-20">
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
