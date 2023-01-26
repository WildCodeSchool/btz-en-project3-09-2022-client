import Image from "next/image";
import React, { useState } from "react";

type IProps = { srcImage: string; nameImage: string };

function ImagePost({ srcImage, nameImage }: IProps) {
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);

  const getImageDimensions = (event: Event) => {
    const { target } = event;
    if (target) {
      setImageHeight((target as HTMLImageElement).clientHeight);
      setImageWidth((target as HTMLImageElement).clientWidth);
    }
  };

  return (
    <div
      className={`relative ${imageHeight > imageWidth ? "w-fit" : "w-full"}`}
    >
      <Image
        src={srcImage}
        alt={nameImage}
        width={imageHeight > imageWidth ? 100 : 200}
        height={imageHeight > imageWidth ? 200 : 100}
        onLoad={getImageDimensions}
        className="rounded-app-bloc max-h-[160px]"
      />
    </div>
  );
}

export default ImagePost;
