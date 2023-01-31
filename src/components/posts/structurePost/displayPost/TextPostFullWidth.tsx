import dynamic from "next/dynamic";
import React from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface IProps {
  text: string;
}

export default function TextPostFullWidth({ text }: IProps) {
  return (
    <div className="w-full h-fit min-h-[100px] max-h-[200px] overflow-y-scroll rounded-app-bloc bg-white-enedis pt-4">
      <QuillNoSSRWrapper readOnly value={text} theme="bubble" />
    </div>
  );
}
