import { TUser } from "../types/main";
/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

export const userFetcher = {
  getAll: async () => (await axiosInstance.get("/users")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TUser>(`/users/${id}`)).data,
};

export const spaceFetcher = {
  getAll: async () => (await axiosInstance.get("/space")).data,
};
