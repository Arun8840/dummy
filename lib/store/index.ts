import { create } from "zustand";
import { initailStateValue, StateTypes } from "./initial-state";

export const useStore = create<StateTypes>((set) => ({
  ...initailStateValue,
  setLoginExp: (userData) => set({ loginExp: userData }),
}));
