import React from "react";
import OpenCategoryDescription from "./OpenCategoryDescription";
import OpenEspaceDescription from "./OpenEspaceDescription";

interface IProps {
  openOrCloseEspaceDescription: boolean;
  handleClickEspaceDescription: () => void;
  HandleClickCategorieDescription: () => void;
  openCategorieDescription: boolean;
}

function DifferentComponentURL({
  openOrCloseEspaceDescription,
  handleClickEspaceDescription,
  HandleClickCategorieDescription,
  openCategorieDescription,
}: IProps) {
  if (window.location.href.includes("espace")) {
    <OpenEspaceDescription
      openOrCloseEspaceDescription={openOrCloseEspaceDescription}
      handleClickEspaceDescription={handleClickEspaceDescription}
    />;
  }
  if (window.location.href.includes("category")) {
    <OpenCategoryDescription
      HandleClickCategorieDescription={HandleClickCategorieDescription}
      openCategorieDescription={openCategorieDescription}
    />;
  }
  return <div />;
}
export default DifferentComponentURL;
