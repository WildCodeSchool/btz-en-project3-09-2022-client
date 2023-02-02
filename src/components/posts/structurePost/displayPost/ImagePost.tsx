import React from "react";

type IProps = { srcImage: string; nameImage: string };

function ImagePost({ srcImage, nameImage }: IProps) {
  return (
    <img
      src={srcImage}
      alt={nameImage}
      className="rounded-app-bloc max-h-[160px] w-fit"
    />
  );
}

export default ImagePost;
