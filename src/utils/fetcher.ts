import {
  TCategory,
  TOneTeam,
  TSite,
  TSpace,
  TTeam,
  TUser,
  TPost,
} from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

export const userFetcher = {
  getAll: async () => (await axiosInstance.get("/users")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TUser>(`/users/${id}`)).data,
  getAllByTeam: async (teamId: string) =>
    (await axiosInstance.get<TUser[]>(`/users?team=${teamId}`)).data,
  getAllBySpace: async ({ spaceId }: { spaceId: string }) =>
    (await axiosInstance.get<TUser[]>(`/users?spaceId=${spaceId}`)).data,
  getAllByCategory: async (CategoryId: string) =>
    (await axiosInstance.get<TUser[]>(`/users?categoryId=${CategoryId}`)).data,
};

export const spaceFetcher = {
  getAll: async () => (await axiosInstance.get<[TSpace]>("/spaces")).data,
  getAllWithCategories: async () =>
    (await axiosInstance.get<[TSpace]>("/spaces?categories=true")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TSpace>(`/spaces/${id}`)).data,
  getOneWithCategories: async (id: string) =>
    (await axiosInstance.get<TSpace>(`/spaces/${id}?categories=true`)).data,
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
  getSitesByMember: async (idMember: string) =>
    (await axiosInstance.get<[TSite]>(`/sites?members=${idMember}`)).data,
};

export const postFetcher = {
  getLatestPostBySpaceWithImage: async ({ spaceId }: { spaceId: string }) =>
    (
      await axiosInstance.get<TPost[]>(
        `/posts?spaceId=${spaceId}&author=true&category=true&image=true&limit=1`
      )
    ).data,
  getAllByCategory: async ({ categoryId }: { categoryId: string }) =>
    (
      await axiosInstance.get<TPost[]>(
        `/posts?categoryId=${categoryId}&author=true&image=true`
      )
    ).data,
};
