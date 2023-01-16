import React from "react";
import { useWindowSize } from "usehooks-ts";
import MyAccountDesktop from "../src/components/MyAccountDesktop";
import MyAccountMobile from "../src/components/MyAccountMobile";

function myaccount() {
  const { width } = useWindowSize();
  return <div>{width < 760 ? <MyAccountMobile /> : <MyAccountDesktop />}</div>;
}

export default myaccount;
