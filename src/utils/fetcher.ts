import {
  TCategory,
  TOneTeam,
  TSite,
  TSpace,
  TTeam,
  TUser,
  TPost,
  TComment,
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
  getOneWithCategoriesAndOwner: async (id: string) =>
    (
      await axiosInstance.get<TSpace>(
        `/spaces/${id}?categories=true&owner=true`
      )
    ).data,
};

export const categoryFetcher = {
  getAll: async () =>
    (await axiosInstance.get<TCategory[]>("/categories")).data,
  getAllByUser: async (id: string) =>
    (await axiosInstance.get<TCategory[]>(`/categories?userId=${id}`)).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TCategory>(`/categories/${id}`)).data,
  getOneWithSpace: async (id: string) =>
    (await axiosInstance.get<TCategory>(`/categories/${id}?space=true`)).data,

  addUserToCategory: async (categoryId: string, usersToConnect: string[]) =>
    (
      await axiosInstance.post(
        `/categories/${categoryId}/adduser`,
        usersToConnect
      )
    ).data,
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

export const postFetcher = {
  getLatestPostBySpaceWithImage: async ({ spaceId }: { spaceId: string }) =>
    (
      await axiosInstance.get<TPost[]>(
        `/posts?spaceId=${spaceId}&author=true&category=true&image=true&limit=1`
      )
    ).data,
  getLatestPostByCategoryWithImage: async ({
    categoryId,
  }: {
    categoryId: string;
  }) =>
    (
      await axiosInstance.get<[TPost]>(
        `/posts?categoryId=${categoryId}&author=true&category=true&image=true&limit=1`
      )
    ).data,
  getAllByCategory: async ({ categoryId }: { categoryId: string }) =>
    (
      await axiosInstance.get<TPost[]>(
        `/posts?categoryId=${categoryId}&author=true&image=true`
      )
    ).data,
};

export const commentFetcher = {
  getAllByPostWithAuthor: async ({ postId }: { postId: string }) =>
    (
      await axiosInstance.get<TComment[]>(
        `/comments?postId=${postId}&author=true`
      )
    ).data,
};
