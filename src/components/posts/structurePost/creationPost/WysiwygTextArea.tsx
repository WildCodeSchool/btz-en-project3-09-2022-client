import dynamic from "next/dynamic";
import React from "react";

const QuillNoSSRWrapper = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

const modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline"],
    [{ list: "bullet" }],
    ["link", "image"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};

interface IProps {
  setBody: (content: string) => void;
}

export default function WysiwygTextArea({ setBody }: IProps) {
  return (
    <div className="w-full mb-5">
      <QuillNoSSRWrapper
        modules={modules}
        onChange={setBody}
        theme="snow"
        placeholder="J’écris mon texte ici..."
        className="bg-white-enedis min-h-[250px] max-h-[350px] rounded-app-bloc overflow-y-scroll scrollbar-hide"
      />
    </div>
  );
}
