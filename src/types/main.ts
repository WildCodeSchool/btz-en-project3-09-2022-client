export type TSpace = {
  name: string;
  imageUrl: string;
  id: string;
  categories?: TCategory[];
};
export type TUser = {
  id: string;
  role: string;
  imageUrl: string;
  firstname: string;
  lastname: string;
  teamId: string;
  workLocation: string;
  birthday: string;
  showBirthday: boolean;
  email: string;
  showEmail: boolean;
  isDisabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TSite = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type TOneTeam = {
  id: string;
  name: string;
  members: [TUser];
  createdAt: string;
  updatedAt: string;
};

export type TTeam = {
  name: string;
};

export type TCategory = {
  id: string;
  name: string;
  imageUrl: string;
  spaceId: string;
  space?: TSpace;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  category?: TCategory;
  authorId: string | null;
  author?: TUser;
  images?: TImage[];
  createdAt: Date;
  updatedAt: Date;
};

export type TImage = {
  id: string;
  userId: string;
  postId: string | null;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};
