/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/dot-notation */
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/structureShared/Loader";
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
  error: string | null;
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
  error: null | string;
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
    error: null,
  });

  // eslint-disable-next-line consistent-return
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

      setAuthState((state) => ({
        ...state,
        isAuth: true,
        user: data,
        isLoading: false,
      }));

      router.push("/");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const { message } = error.response.data;

          setAuthState((state) => ({
            ...state,
            error: message,
            isLoading: false,
          }));
        }
      }
    }
  };

  const signOut = async () => {
    setAuthState({
      user: null,
      isAuth: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem("token");
    axiosInstance.defaults.headers.common["Authorization"] = "";
    router.push("/auth/signin");
  };

  const authMe = async () => {
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
          error: null,
        });
      })
      .catch(() => {
        localStorage.setItem("token", "");

        router.push("/auth/signin");

        setAuthState((state) => ({
          ...state,
          isLoading: false,
        }));
      });
  };

  useEffect(() => {
    authMe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: authState.user,
        isAuth: authState.isAuth,
        signIn,
        signOut,
        error: authState.error,
      }}
    >
      {authState.isLoading ? <Loader /> : children}
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
