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

export default function TextPostFullWidth({ text }: IProps) {
  return (
    <div className="w-full h-fit min-h-[100px] max-h-[200px] overflow-y-scroll scrollbar-hide rounded-app-bloc bg-white-enedis pt-4 px-2">
      <QuillNoSSRWrapper readOnly value={text} theme="bubble" />
    </div>
  );
}
