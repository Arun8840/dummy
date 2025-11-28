export interface ClientData {
  id: string;
  name: string;
  clientId: number;
  active: boolean;
  address: Record<string, any>; // Or define a stricter type if you know the structure
  email: string;
  phone: string;
  gridfsId: string;
  fileName: string;
  fileSize: number;
  planId: string;
  planName: string;
  status: string;
  createdUserId: string;
  createdDate: string; // You can also use Date if you parse it
  modifiedUserId: string;
  modifiedDate: string; // Same here – string or Date
}

export type ClientTemplateResponse = ClientData[];

export interface Plan {
  id: string;
  name: string;
  description: string;
  header: string;
  subHeader: string;
  monthlyPrice: number;
  totalPrice: number;
  currency: string;
  region: string;
  menuIds: string[];
  active: boolean;
  type: string;
  status: string;
  createdUserId: string;
  createdDate: string; // or Date
  modifiedUserId: string;
  modifiedDate: string; // or Date
}

export type PlanResponse = Plan[];

export interface OrganizationalUnit {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  ouId: string;
  active: boolean;
  defaultBu: boolean;
  thirdpartyId: string;
  status: string;
  planId: string;
  planName: string;
  createdUserId: string;
  createdDate: string; // You can change to Date if you parse it
  modifiedUserId: string;
  modifiedDate: string; // Same as above
}
export type OrganizationalUnitResponse = OrganizationalUnit[];

export interface RoleData {
  id: string;
  name: string;
  description: string;
  accessLevel: number;
  hidden: boolean;
  componentType: string; // "Role"
  subComponentType: string;
  landingPageMenuId: string;
  permissionIds: string[];
  status: "Published" | "Draft" | string; // extend if needed
  createdUserId: string;
  createdDate: string; // or Date
  modifiedUserId: string;
  modifiedDate: string; // or Date
}
export type RoleResponseType = RoleData[];
