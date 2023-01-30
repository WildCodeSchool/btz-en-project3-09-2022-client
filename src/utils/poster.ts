import { TCategory, TImage, TPost, TSpace } from "../types/main";

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

export const categoryFetcher = {
  post: async (formData: FormData) =>
    await axiosInstance.post<TCategory>("/categories", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),
};

export const spaceFetcher = {
  post: async (
    nameSpace: string,
    imageUrlSpace: string,
    descriptionSpace: string,
    siteIdSpace: string,
    ownerIdSpace: string
  ) =>
    await axiosInstance.post<TSpace>("/spaces", {
      name: nameSpace,
      imageUrl: imageUrlSpace,
      description: descriptionSpace,
      siteId: siteIdSpace,
      ownerId: ownerIdSpace,
    }),
};
