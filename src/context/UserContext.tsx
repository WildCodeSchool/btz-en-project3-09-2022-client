/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/dot-notation */
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { TSpace } from "../types/main";
import axiosInstance from "../utils/axiosInstance";

type TUser = {
  id: string;
  role: string;
  imageUrl: string;
  firstname: string;
  lastname: string;
  teamId: string;
  workLocation: string;
  birthday: Date;
  email: string;
  isDisabled: boolean;
  createdAt: string;
  updatedAt: string;
  spaces: TSpace[];
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
  isLoading: boolean;
};

const UserContext = createContext<IUserContext | null>(null);

const localtoken =
  typeof window !== "undefined" && localStorage.getItem("token");

function UserContextProvider({ children }: TUserContextProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuth: false,
    isLoading: true,
  });

  const signIn = async ({ email, password }: TCredentials) => {
    setAuthState((state) => ({
      ...state,
      isLoading: true,
    }));
    try {
      const { data, headers } = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });
      const token = headers["authorization"];
      axiosInstance.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token || "");
      console.log(axiosInstance.defaults.headers.common);
      setAuthState(() => ({
        isAuth: true,
        user: data,
        isLoading: false,
      }));

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    setAuthState({
      user: null,
      isAuth: false,
      isLoading: false,
    });
    localStorage.removeItem("token");
    axiosInstance.defaults.headers.common["Authorization"] = "";
    router.push("/auth/signin");
  };

  const authMe = async () => {
    console.log("TOKEN", localtoken);
    setAuthState((state) => ({
      ...state,
      isLoading: true,
    }));
    await axiosInstance
      .post("/auth/me", {
        headers: {
          Authorization: localtoken,
        },
      })
      .then((res) => {
        setAuthState({
          isAuth: true,
          user: res.data,
          isLoading: false,
        });
      })
      .catch(() => {
        localStorage.setItem("token", "");
        setAuthState((state) => ({
          ...state,
          isLoading: false,
        }));
        router.push("/auth/signin");
      });
  };

  useEffect(() => {
    authMe();
    console.log(axiosInstance.defaults.headers.common);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: authState.user,
        isAuth: authState.isAuth,
        signIn,
        signOut,
      }}
    >
      {authState.isLoading ? "Loading ..." : children}
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
