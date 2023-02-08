import { TUser, TCategory } from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

export const userUpdater = {
  updateProfilePic: async (userId: string, formData: FormData) =>
    await axiosInstance.put<TUser>(`/users/${userId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),
};

export const categoryUpdater = {
  disable: async (categoryId: string) =>
    (await axiosInstance.put<TCategory>(`/categories/${categoryId}/disable`))
      .data,
};
