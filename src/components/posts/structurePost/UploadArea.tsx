import Image from "next/image";
import React from "react";

function UploadArea() {
  return (
    <div
      id="drop-zone"
      // onDrop={console.log("Dropped")}
      className="flex justify-center items-center space-x-[20%] border-4 h-[120px] p-4
      border-dark-enedis border-dashed bg-white-enedis hover:bg-dark-enedis hover:bg-opacity-20
      rounded-upload-area md:h-[170px]"
    >
      <p className="font-enedis font-bold text-mob-sm(multiuse) md:text-desk-lg(CTA+input)">
        Je joins une image
        <br />
        <span className="font-regular">(option)</span>
      </p>
      <div className="w-[78px] h-[56px] relative md:w-[100px] md:h-[72px]">
        <Image
          src="/assets/icons/icon-upload.svg"
          alt="Upload icon"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default UploadArea;
