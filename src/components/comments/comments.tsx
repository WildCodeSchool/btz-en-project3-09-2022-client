/* eslint-disable no-console */
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";
import { commentsFetcher } from "../../utils/fetcher";

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    commentsFetcher.getAll();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("NEXT_PUBLIC_SERVER_URL/comments")
      .then((res) => {
        setComments([...comments, res.data]);
        setNewComment("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          placeholder="Mon commentaire à écrire"
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-white-enedis border rounded-app-bloc text-mob-xs(textPost)"
        />
        <Image
          src={user?.imageUrl || "/profile_image.png"}
          alt="user picture"
          width={10}
          height={10}
          quality={100}
          className="border"
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Comments;
