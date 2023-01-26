import Image from "next/image";
import React from "react";

type IProps = { srcImage: string; nameImage: string };

function ImagePost({ srcImage, nameImage }: IProps) {
  return (
    <div className="w-full  relative">
      <Image
        src={srcImage}
        alt={nameImage}
        width={200}
        height={100}
        className="rounded-app-bloc"
      />
    </div>
  );
}

export default ImagePost;
