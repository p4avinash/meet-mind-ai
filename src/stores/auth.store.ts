import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: IUser, token: string) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      setUser: (user) =>
        set({
          user,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;