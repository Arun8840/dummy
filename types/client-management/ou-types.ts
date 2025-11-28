export interface ClientOUDetails {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  ouId: string;
  active: boolean;
  defaultBu: boolean;
  thirdpartyId: string;
  status: "Draft" | "Published" | string; // extend if needed
  planId: string;
  planName: string;
  createdUserId: string;
  createdDate: string; // or Date if you parse it
  modifiedUserId: string;
  modifiedDate: string; // or Date if you parse it
}

export type OuResponseType = ClientOUDetails;
