export interface OuUsers {
  id: string;
  username: string;
  clientId: string;
  ouId: string;
  firstName: string;
  lastName: string;
  userType: "ClientUser" | string; // extend if needed
  provider: "local" | "google" | "azure" | string; // optional union
  userGroupId: string;
  roleIds: string[];
  defaultLanguage: string; // e.g., "en-us"
}

export type OuUserResponse = OuUsers[];
