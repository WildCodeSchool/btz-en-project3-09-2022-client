/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuth } from "../../../../context/UserContext";
import { imageFetcher, postFetcher } from "../../../../utils/poster";
import CTA from "../../../structureShared/CTA";
import ProfilePicMini from "../../../structureShared/ProfilePicMini";
import CategoryChoosingCategory from "./CategoryChoosingCategory";
import CategoryChoosingHP from "./CategoryChoosingHP";
import CategoryChoosingInSpace from "./CategoryChoosingInSpace";
import PostTitle from "./PostTitle";
import SubmittedPost from "./SubmittedPost";
import UploadArea from "./UploadArea";
import WysiwygTextArea from "./WysiwygTextArea";

function CreatePost() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [categoryChosen, setCategoryChosen] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!user) {
    return <div>Please connect first</div>;
  }

  const handleSubmit = async () => {
    if (!categoryChosen || !title || !body) {
      return setTriedToSubmit(true);
    }

    const postSubmitted = await postFetcher.post(
      title,
      body,
      user.id,
      categoryChosen[0]!
    );

    if (image) {
      const formData = new FormData();
      formData.append("postImage", image as File);
      formData.append("postId", postSubmitted.data.id);
      await imageFetcher.post(formData);
    }
    queryClient.invalidateQueries(["latestPost", `${categoryChosen[1]}`]);
    queryClient.invalidateQueries(["AllGeneralPostsInSpace"]);
    queryClient.invalidateQueries(["AllPostsInCategory"]);
    return setSubmitted(true);
  };

  return (
    <div className="relative">
      {!submitted ? (
        <>
          <div className="h-fit md:flex md:mb-4 md:space-x-3">
            <div className="min-w-[37%] flex items-center justify-between mb-[10px] space-x-3 md:mb-0">
              <ProfilePicMini
                firstname={user.firstname}
                lastname={user.lastname}
                imageUrl={user.imageUrl}
              />
              {window.location.href.includes("category") && (
                <CategoryChoosingCategory
                  setCategoryChosen={setCategoryChosen}
                />
              )}
              {window.location.href.includes("space") &&
                !window.location.href.includes("category") && (
                  <CategoryChoosingInSpace
                    setCategoryChosen={setCategoryChosen}
                  />
                )}
              {!window.location.href.includes("space") &&
                !window.location.href.includes("category") && (
                  <CategoryChoosingHP setCategoryChosen={setCategoryChosen} />
                )}
            </div>
            <div className="w-full mb-[15px] md:mb-0">
              <PostTitle setTitle={setTitle} />
            </div>
          </div>
          <WysiwygTextArea setBody={setBody} />
          <UploadArea
            handleSubmit={handleSubmit}
            image={image}
            setImage={setImage}
          />
          {triedToSubmit && (
            <p className="w-full text-mob-sm(multiuse) mt-4 font-regular text-redError-enedis">
              <span className="font-bold">ATTENTION :</span> vérifiez que votre
              post a au moins une catégorie, un titre et un texte
            </p>
          )}
          <div className="absolute w-full centered-x-absolute -bottom-20">
            <CTA text="Je publie" action={handleSubmit} />
          </div>
        </>
      ) : (
        <SubmittedPost />
      )}
    </div>
  );
}

export default CreatePost;
