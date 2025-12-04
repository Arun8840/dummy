export interface ClientPlan {
  id: string;
  name: string;
  description: string;
  planId: string;
  clientId: string;
  clientName: string;
  ouName: string;
  header: string;
  subHeader: string;
  monthlyPrice: number;
  totalPrice: number;
  currency: string;
  region: string;
  menuIds: string[];
  permissionIds: string[];
  roles: Role[];
  active: boolean;
  type: string;
  status: string;
  createdUserId: string;
  createdDate: string;
  modifiedUserId: string;
  modifiedDate: string;
}

export interface RolePermissions {
  id: string;
  name: string;
  components: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  resourceGroup: string;
  resource: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  accessLevel: number;
  permissionIds: string[];
  permissions: RolePermissions[];
  landingPageMenuId: string;
  landingPageMenuContainerId: string;
  landingPageMenuTemplateId: string;
  hidden: boolean;
  componentType: string;
  subComponentType: string;
  roles: SubRole[];
}

export interface SubRole {
  id: string;
  name: string;
  description: string;
  accessLevel: number;
  permissionIds: string[];
  landingPageMenuId: string;
  landingPageMenuContainerId: string;
  landingPageMenuTemplateId: string;
  hidden: boolean;
  componentType: string;
  subComponentType: string;
  permissions: RolePermissions[];
  roles: any[]; // no further nested roles in sample
}

export type ClientPlanResponseType = ClientPlan[];
