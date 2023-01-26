import {
  TCategory,
  TOneTeam,
  TSite,
  TSpace,
  TTeam,
  TUser,
} from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

export const userFetcher = {
  getAll: async () => (await axiosInstance.get("/users")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TUser>(`/users/${id}`)).data,
  getAllByTeam: async (teamId: string) =>
    (await axiosInstance.get<TUser[]>(`/users?team=${teamId}`)).data,
};

export const spaceFetcher = {
  getAll: async () => (await axiosInstance.get<TSpace[]>("/spaces")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TSpace>(`/spaces/${id}`)).data,
};

export const categoryFetcher = {
  getAll: async () =>
    (await axiosInstance.get<TCategory[]>("/categories")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TCategory>(`/categories/${id}`)).data,
  getAllByUser: async (id: string) =>
    (await axiosInstance.get<TCategory[]>(`/categories?userId=${id}`)).data,
};

export const teamFetcher = {
  getAll: async () => (await axiosInstance.get<TTeam>("/teams")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TOneTeam>(`/teams/${id}`)).data,
  getOneTeamAllMembers: async (id: string) =>
    (await axiosInstance.get(`/teams/${id}?members=true`)).data,
};

export const siteFetcher = {
  getAll: async () => (await axiosInstance.get<TSite>("/sites")).data,
  getSitesByMember: async (idMember: string) =>
    (await axiosInstance.get<[TSite]>(`/sites?members=${idMember}`)).data,
};
