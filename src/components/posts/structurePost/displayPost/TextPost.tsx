import dynamic from "next/dynamic";
import React from "react";

const QuillNoSSRWrapper = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

interface IProps {
  text: string;
}

export default function TextPost({ text }: IProps) {
  return (
    <div className="min-w-[55%] max-w-[70%] h-52 overflow-y-scroll scrollbar-hide rounded-app-bloc bg-white-enedis px-1">
      <QuillNoSSRWrapper readOnly value={text} theme="bubble" />
    </div>
  );
}
