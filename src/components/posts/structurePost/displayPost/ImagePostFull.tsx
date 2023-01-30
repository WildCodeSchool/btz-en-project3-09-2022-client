import React from "react";

type IProps = { srcImage: string; nameImage: string };

function ImagePostFull({ srcImage, nameImage }: IProps) {
  return (
    <img
      src={srcImage}
      alt={nameImage}
      className="rounded-app-bloc max-h-[300px] w-fit mx-auto mb-[20px] sm:mb-[40px]"
    />
  );
}

export default ImagePostFull;
