import Image from "next/image";
import React from "react";

type Props = {
  handleClickEspaceDescription: () => void;
  openOrCloseEspaceDescription: boolean;
};

function OpenEspaceDescription({
  openOrCloseEspaceDescription,
  handleClickEspaceDescription,
}: Props) {
  return (
    <div className="w-full">
      <div
        className={`relative flex justify-center w-full  h-full  ${
          openOrCloseEspaceDescription && "bg-background-enedis"
        } `}
      >
        {openOrCloseEspaceDescription ? (
          <div className="flex items-center justify-center ">
            <Image
              src="/logo_enedis/PictoInfoBlue.svg"
              width={40}
              height={40}
              alt="logo des info-espaces"
              className=" z-20  "
              onClick={handleClickEspaceDescription}
            />
          </div>
        ) : (
          <div className="relative flex justify-center  w-full bg-blue-enedis">
            <div className=" flex justify-center items-center">
              <Image
                src="/logo_enedis/PictoInfoGreen.svg"
                width={30}
                height={40}
                alt="logo des info-espaces"
                onClick={handleClickEspaceDescription}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OpenEspaceDescription;
