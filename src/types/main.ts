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
