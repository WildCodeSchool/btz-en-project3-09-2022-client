/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/dot-notation */
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

type TUser = {
  id: string;
  role: string;
  imageUrl: string;
  fistname: string;
  lastname: string;
  teamId: string;
  workLocation: string;
  birthday: Date;
  email: string;
  isDisabled: boolean;
  createdAt: string;
  updatedAt: string;
};

interface IUserContext {
  user: TUser | null;
  isAuth: boolean;
  signIn: (credentials: TCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

type TUserContextProviderProps = {
  children: React.ReactNode;
};

type TCredentials = {
  email: string;
  password: string;
};

type AuthState = {
  user: TUser | null;
  isAuth: boolean;
};

const UserContext = createContext<IUserContext | null>(null);

function UserContextProvider({ children }: TUserContextProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuth: false,
  });

  const signIn = async ({ email, password }: TCredentials) => {
    try {
      const { data, headers } = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });
      setAuthState(() => ({
        isAuth: true,
        user: data,
      }));
      const token = headers["authorization"];
      axiosInstance.defaults.headers.common["authorization"] = token;
      localStorage.setItem("token", token || "");

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    setAuthState({
      user: null,
      isAuth: false,
    });
    localStorage.removeItem("token");
    axiosInstance.defaults.headers.common["authorization"] = "";
    router.push("/auth/signin");
  };

  return (
    <UserContext.Provider
      value={{
        user: authState.user,
        isAuth: authState.isAuth,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
