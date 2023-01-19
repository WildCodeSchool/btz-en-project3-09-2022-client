/* eslint-disable no-console */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";

interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

function Comments() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState();

  const getComments = () => {
    return axios
      .get("http://localhost:4000/api/v1/comments")
      .then((res) => res.data);
  };

  const createComment = ({ content }) => {
    return axios
      .post("http://localhost:4000/api/v1/comments", {
        content,
        postId,
        authorId,
        createdAt: Date.now(),
      })
      .then((res) => res.data);
  };

  const commentQuery = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments,
  });

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      queryClient.setQueryData(["comments", data.id], data);
      queryClient.invalidateQueries(["comments"], { exact: true });
      setComment();
    },
  });

  return (
    <div className="flex justify-center items-center bg-background-enedis h-52">
      <form onSubmit={}>
        <div className="flex justify-end relative">
          <input
            type="text"
            value={}
            placeholder="Mon commentaire à écrire"
            onChange={}
            className="bg-white-enedis border rounded-app-bloc text-mob-xs(textPost) static"
          />
          <Image
            src={user?.imageUrl || "/profile_image.png"}
            alt="user picture"
            width={10}
            height={10}
            quality={100}
            className="border rounded-full absolute right-0 top-0 bottom-0 mx-auto"
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
      {/* <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <p>Posté par: {comment.authorId}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Comments;
