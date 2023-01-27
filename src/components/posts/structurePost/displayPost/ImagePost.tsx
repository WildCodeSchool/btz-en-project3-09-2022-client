import React from "react";

type IProps = { srcImage: string; nameImage: string };

function ImagePost({ srcImage, nameImage }: IProps) {
  // const [imageHeight, setImageHeight] = useState<number>(0);
  // const [imageWidth, setImageWidth] = useState<number>(0);

  // const getImageDimensions = (event: Event) => {
  //   const { target } = event;
  //   if (target) {
  //     setImageHeight((target as HTMLImageElement).naturalHeight);
  //     setImageWidth((target as HTMLImageElement).naturalWidth);
  //   }
  // };

  return (
    <img
      src={srcImage}
      alt={nameImage}
      className="rounded-app-bloc max-h-[160px] w-fit"
    />
    //   <div
    //     className={`relative ${imageHeight > imageWidth ? "w-fit" : "w-full"}`}
    //   >
    //     <Image
    //       src={srcImage}
    //       alt={nameImage}
    //       width={imageHeight > imageWidth ? 100 : 200}
    //       height={imageHeight > imageWidth ? 200 : 100}
    //       onLoad={getImageDimensions}
    //       className={`rounded-app-bloc max-h-[160px] ${
    //         imageHeight > imageWidth && "p-0"
    //       }`}
    //     />
    //   </div>
  );
}

export default ImagePost;
