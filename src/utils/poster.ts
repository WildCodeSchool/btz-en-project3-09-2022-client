import { TPost } from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

// eslint-disable-next-line import/prefer-default-export
export const postPoster = {
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
