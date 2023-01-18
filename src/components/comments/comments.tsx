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
    // commentsFetcher.getAll();
    const fetchComments = async () => {
      try {
        const res = await axios.get("NEXT_PUBLIC_SERVER_URL/comments");
        setComments(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
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
    <div className="flex justify-center items-center bg-background-enedis h-52">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-end relative">
          <input
            type="text"
            value={newComment}
            placeholder="Mon commentaire à écrire"
            onChange={(e) => setNewComment(e.target.value)}
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
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <p>Posté par: {comment.authorId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
