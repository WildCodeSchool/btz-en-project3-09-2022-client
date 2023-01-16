import React from "react";
import { useWindowSize } from "usehooks-ts";
import MyAccountDesktop from "../src/components/MyAccountDesktop";
import MyAccountMobile from "../src/components/MyAccountMobile";
import { useAuth } from "../src/context/UserContext";

function myaccount() {
  const { user } = useAuth();
  const { width } = useWindowSize();
  return (
    <div>
      {width < 760 ? <MyAccountMobile user={user} /> : <MyAccountDesktop />}
    </div>
  );
}

export default myaccount;
