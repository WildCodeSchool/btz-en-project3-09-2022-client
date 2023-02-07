import { TCategory } from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

// eslint-disable-next-line import/prefer-default-export
export const categoryUpdater = {
  disable: async (categoryId: string) =>
    (await axiosInstance.put<TCategory>(`/categories/${categoryId}/disable`))
      .data,
};
