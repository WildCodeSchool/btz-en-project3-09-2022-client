import { TImage, TPost } from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

// eslint-disable-next-line import/prefer-default-export
export const postFetcher = {
  post: async (
    postTitle: string,
    postBody: string,
    postAuthorId: string,
    postCategoryId: string
  ) =>
    await axiosInstance.post<TPost>("/posts", {
      title: postTitle,
      content: postBody,
      authorId: postAuthorId,
      categoryId: postCategoryId,
    }),
};

export const imageFetcher = {
  post: async (formData: FormData) =>
    await axiosInstance.post<TImage>("/images", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),
};
