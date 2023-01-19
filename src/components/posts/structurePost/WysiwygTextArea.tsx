import React from "react";

interface IProps {
  setBody: (body: string) => void;
}

function WysiwygTextArea({ setBody }: IProps) {
  return (
    <textarea
      required
      wrap="soft"
      onChange={(e) => setBody(e.target.value)}
      className="w-full min-h-[250px] max-h-[350px] mb-5 outline-none text-mob-sm(multiuse) text-left font-enedis font-regular rounded-app-bloc px-4 py-3
        bg-white-enedis md:text-desk-md(titlePubli+multiuse) resize-y"
      placeholder="J’écris mon texte ici..."
    />
  );
}

export default WysiwygTextArea;
