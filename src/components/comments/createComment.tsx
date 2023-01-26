/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../../context/UserContext";
import { TComment } from "../../types/main";
import axiosInstance from "../../utils/axiosInstance";

interface IProps {
  onSubmit: (newComment: TComment) => void;
}

function CreateComment({ onSubmit }: IProps) {
  const { user } = useAuth();

  const [body, setBody] = useState("");
  const [post, setPost] = useState("5d603f90-ab0b-4ec2-99cf-01c6b768232d");

  // setPost : props avec le postId

  const client = useQueryClient();

  const postComment = {
    post: (content: string, authorId: string, postId: string) =>
      axiosInstance.post<TComment>("/comments", {
        content,
        authorId,
        postId,
      }),
  };

  if (!user) {
    return <div>Please connect first</div>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postComment
      .post(body, user.id, post)
      .then((response) => {
        onSubmit(response.data);
      })
      .then(() => {
        client.invalidateQueries(["comments"]);
        setBody("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex relative">
          <input
            type="text"
            value={body}
            placeholder="Mon commentaire à écrire"
            className="bg-white-enedis rounded-app-bloc text-mob-xs(textPost) static px-10 py-4"
            onChange={(e) => setBody(e.target.value)}
          />
          <Image
            src={user?.imageUrl || "/profile_image.png"}
            alt="user picture"
            width={48}
            height={48}
            quality={100}
            className="rounded-full absolute -right-4 top-0 bottom-0 mx-auto"
          />
        </div>
        <button type="submit">Commenter</button>
      </form>
    </div>
  );
}

export default CreateComment;
