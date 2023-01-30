import dynamic from "next/dynamic";
import React from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface IProps {
  text: string;
}

export default function TextPostFull({ text }: IProps) {
  return (
    <div className="w-full min-h-[150px] rounded-app-bloc bg-white-enedis mb-[14px] sm:mb-[24px]">
      <QuillNoSSRWrapper readOnly value={text} theme="bubble" />
    </div>
  );
}
