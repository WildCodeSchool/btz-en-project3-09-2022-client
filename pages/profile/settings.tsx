import React from "react";
import { useWindowSize } from "usehooks-ts";
import SettingsMobile from "../../src/components/SettingsMobile";
import SettingsDesktop from "../../src/components/SettingsDesktop";

function Settings() {
  const { width } = useWindowSize();
  return <div>{width < 760 ? <SettingsMobile /> : <SettingsDesktop />}</div>;
}

export default Settings;
