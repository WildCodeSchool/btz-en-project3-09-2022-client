import { TUser } from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

// eslint-disable-next-line import/prefer-default-export

const userUpdater = {
  updateProfilePic: async (userId: string, formData: FormData) =>
    await axiosInstance.put<TUser>(`/users/${userId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),
};

export default userUpdater;
