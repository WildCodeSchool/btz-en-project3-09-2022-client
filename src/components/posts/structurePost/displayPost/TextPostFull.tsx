import dynamic from "next/dynamic";
import React from "react";
import LoaderFocus from "../../../structureShared/LoaderFocus";

const QuillNoSSRWrapper = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <LoaderFocus />,
  }
);

interface IProps {
  text: string;
}

export default function TextPostFull({ text }: IProps) {
  return (
    <div className="w-full min-h-[150px] rounded-app-bloc bg-white-enedis mb-[14px] sm:mb-[24px] px-3">
      <QuillNoSSRWrapper readOnly value={text} theme="bubble" />
    </div>
  );
}
