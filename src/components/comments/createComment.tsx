/* eslint-disable no-console */
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { TComment } from "../../types/main";
import axiosInstance from "../../utils/axiosInstance";

function CreateComment() {
  const { user } = useAuth();

  const [body, setBody] = useState("");
  const [post, setPost] = useState("");

  // setPost : props avec le postId

  const postComment = {
    post: (content: string, authorId: string, postId: string) =>
      axiosInstance.post<TComment>("/comments", {
        content,
        authorId,
        post: postId,
      }),
  };

  if (!user) {
    return <div>Please connect first</div>;
  }

  const handleSubmit = () => {
    return postComment.post(body, user.id, post);
  };

  return (
    <div className="flex justify-center items-center bg-background-enedis h-52">
      <form>
        <div className="flex relative">
          <input
            type="text"
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
        <button type="submit" onClick={handleSubmit}>
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default CreateComment;
