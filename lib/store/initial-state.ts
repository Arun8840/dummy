import { LoginExperienceResponse } from "@/types/auth-types";

export interface StateTypes {
  loginExp: LoginExperienceResponse | undefined;
  setLoginExp?: (userData: LoginExperienceResponse) => void;
}

export const initailStateValue: StateTypes = {
  loginExp: undefined,
};
