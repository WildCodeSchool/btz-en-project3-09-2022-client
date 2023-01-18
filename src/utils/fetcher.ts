import { TOneTeam, TSite, TSpace, TTeam, TUser } from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

export const userFetcher = {
  getAll: async () => (await axiosInstance.get("/users")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TUser>(`/users/${id}`)).data,
  getAllMembersOneTeam: async (teamId: string, idUserExcluded: string) =>
    (
      await axiosInstance.get<[TUser]>(
        `/users?team=${teamId}&userExcluded=${idUserExcluded}`
      )
    ).data,
  get5MembersOneTeam: async (teamId: string, idUserExcluded: string) =>
    (
      await axiosInstance.get<[TUser]>(
        `/users?team=${teamId}&userExcluded=${idUserExcluded}&limit=5`
      )
    ).data,
};

export const spaceFetcher = {
  getAll: async () => (await axiosInstance.get<TSpace[]>("/spaces")).data,
};

export const teamFetcher = {
  getAll: async () => (await axiosInstance.get<TTeam>("/teams")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TOneTeam>(`/teams/${id}`)).data,
  getOneTeamAllMembers: async (id: string) =>
    (await axiosInstance.get(`/teams/${id}?members=true`)).data,
};

export const siteFetcher = {
  getSitesByMember: async (idMember: string) =>
    (await axiosInstance.get<[TSite]>(`/sites?members=${idMember}`)).data,
};

export const commentsFetcher = {
  getAll: async () => (await axiosInstance.get<any[]>("/comments")).data,
};
