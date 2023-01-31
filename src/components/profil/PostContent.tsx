import dynamic from "next/dynamic";
import React, { useState } from "react";
import { TPost } from "../../types/main";
import CategoryPost from "../posts/structurePost/displayPost/CategoryPost";
import DatePost from "../posts/structurePost/displayPost/DatePost";
import TitlePost from "../posts/structurePost/displayPost/TitlePost";
import ProfilePicMini from "../structure/ProfilePicMini";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

type Props = {
  post: TPost;
};

export default function PostContent({ post }: Props) {
  const [showContent, setShowContent] = useState(false);

  const handleShowContent = () => {
    setShowContent(!showContent);
  };
  return (
    <div className="my-5 px-5  min-w-[90%] max-w-[90%] border-l-8 border-green-enedis">
      <div className="flex  justify-between mb-2 m-auto">
        <div className="flex">
          <ProfilePicMini
            firstname={`${post.author?.firstname}`}
            imageUrl={`${post.author?.imageUrl}`}
            lastname={`${post.author?.lastname}`}
            key={post.id}
          />
          <div className=" ml-2 ">
            <CategoryPost categoryName={`${post.category?.name}`} />
          </div>
        </div>
        <DatePost datePost={post.createdAt} />
      </div>
      <button type="button" className="w-5/6 ml-10" onClick={handleShowContent}>
        <TitlePost title={post.title} />
        {showContent && (
          <div className="bg-white-enedis rounded-app-bloc mt-2 ml-2 p-5 text-left">
            <QuillNoSSRWrapper readOnly value={post.content} theme="bubble" />
          </div>
        )}
      </button>
    </div>
  );
}
