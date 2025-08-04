import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      role: null,

      setToken: ({ token, role }) => {
        set({ token, role });
      },

      logout: () => {
        set({ token: null, role: null });
      },
    }),
    {
      name: "auth", // localStorage key
    }
  )
);

export default useAuthStore;
