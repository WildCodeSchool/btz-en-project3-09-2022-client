import { TOneTeam, TSpace, TUser } from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

export const userFetcher = {
  getAll: async () => (await axiosInstance.get("/users")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TUser>(`/users/${id}`)).data,
  getAllMembersOneTeam: async (teamId: string) =>
    (await axiosInstance.get<[TUser]>(`/users?team=${teamId}`)).data,
  get5MembersOneTeam: async (teamId: string) =>
    (await axiosInstance.get<[TUser]>(`/users?team=${teamId}&limit=5`)).data,
};

export const spaceFetcher = {
  getAll: async () => (await axiosInstance.get<TSpace[]>("/spaces")).data,
};

export const teamFetcher = {
  getAll: async () => (await axiosInstance.get("/teams")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TOneTeam>(`/teams/${id}`)).data,
};
