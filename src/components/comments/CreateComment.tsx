/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { useAuth } from "../../context/UserContext";
import useAutosizeTextArea from "../../hooks/ useAutosizeTextArea";
import { TComment } from "../../types/main";
import { commentFetcher } from "../../utils/poster";
import ProfilePic from "../structureShared/ProfilePic";

interface IProps {
  onSubmit: (newComment: TComment) => void;
  postID: string;
}

function CreateComment({ onSubmit, postID }: IProps) {
  const [body, setBody] = useState("");
  const { user } = useAuth();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const client = useQueryClient();

  useAutosizeTextArea(textAreaRef.current, body);

  if (!user) {
    return <div>Please connect first</div>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commentFetcher
      .post(body, user.id, postID)
      .then((response) => {
        onSubmit(response.data);
      })
      .then(() => {
        client.invalidateQueries(["AllComments"]);
        setBody("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full flex justify-end mt-8">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-10/12 xl:w-8/12 flex flex-row-reverse"
      >
        <div className="flex relative w-full">
          <textarea
            value={body}
            ref={textAreaRef}
            rows={1}
            style={{ outline: "none" }}
            placeholder="Mon commentaire à écrire"
            className="bg-white-enedis w-full h-fit max-h-44 rounded-app-bloc text-mob-xs(textPost) pr-8 pl-4 py-3 -mr-4
            md:text-desk-sm(textPost+multiuse) resize-none"
            onChange={(e) => setBody(e.target.value)}
          />
          <ProfilePic
            firstname={user.firstname}
            lastname={user.lastname}
            imageUrl={user.imageUrl}
            id={user.id}
          />
        </div>
        {body !== "" ? (
          <button
            type="submit"
            className="w-[40px] min-w-[40px] h-[40px] bg-green-enedis relative rounded-full overflow-hidden mr-2"
          >
            <Image
              alt="Envoyer"
              src="/assets/icons/icon-send.svg"
              fill
              className="object-contains scale-75 object-center"
            />
          </button>
        ) : (
          <div className="w-[40px] min-w-[40px] h-full mr-2" />
        )}
      </form>
    </div>
  );
}

export default CreateComment;
