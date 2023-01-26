/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";

interface IProps {
  handleSubmit: (e: FormEvent) => void;
  image: File | null | undefined;
  setImage: (image: File | null) => void;
}

function ImageDisplay({ handleSubmit, image, setImage }: IProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  if (image) {
    return (
      <div className="relative w-full h-[120px] md:h-[170px]">
        <Image
          src={imagePreview!}
          alt="Preview of the file"
          fill
          className="object-contain"
        />
        <button
          type="button"
          onClick={() => setImage(null)}
          className="h-6 w-6 rounded-full bg-white-enedis border-[1px] border-blue-enedis absolute centered-x-absolute -top-2"
        >
          <p className="text-blue-enedis font-enedis font-bold">╳</p>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => ref.current!.click()}
      className="flex justify-center items-center w-full space-x-[20%] border-4 h-[120px] p-4
        border-dark-enedis border-dashed bg-white-enedis hover:bg-dark-enedis hover:bg-opacity-20
        rounded-upload-area md:h-[170px]"
    >
      <p className="font-enedis font-bold text-mob-sm(multiuse) md:text-desk-lg(CTA+input)">
        Je joins une image
        <br />
        <span className="font-regular">(option)</span>
      </p>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="w-[78px] h-[56px] relative md:w-[100px] md:h-[72px]"
      >
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files![0]!);
            setImagePreview(URL.createObjectURL(e.target.files![0]!));
          }}
          ref={ref}
          className="hidden"
        />
        <Image
          src="/assets/icons/icon-upload.svg"
          alt="Upload icon"
          fill
          className="object-cover"
        />
      </form>
    </button>
  );
}

export default ImageDisplay;
