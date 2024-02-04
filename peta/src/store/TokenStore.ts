import { createStore } from "zustand";

export interface TokenState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useTokenStore = createStore<TokenState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export const useTokenState = useTokenStore((state: TokenState) => state);
