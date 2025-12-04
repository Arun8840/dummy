"use client";
import { Badge } from "@/components/ui/badge";
import {
  RolePermissions,
  SubRole,
} from "@/types/client-management/client-plan-types";
import { AlertCircle, Asterisk } from "lucide-react";

interface ClientRolePermissionsProps {
  roles: SubRole[];
  permissions: RolePermissions[];
}

// Recursive component to render a SubRole and its children correctly
const SubRoleRecursive = ({
  subRoles,
  level = 0,
}: {
  subRoles: SubRole[];
  level?: number;
}) => {
  if (!subRoles || subRoles.length === 0) return null;

  return (
    <div>
      <h1 className={`text-md font-medium pl-2 flex items-center gap-x-2`}>
        <Asterisk />
        Sub Roles
      </h1>
      <div className="pl-4">
        {subRoles.map((subRole, subRoleIdx) => {
          const roleOrder = subRoleIdx + 1;
          return (
            <div key={subRole?.id}>
              <h1 className="p-2 text-md">
                {roleOrder}.&nbsp;{subRole?.name}
              </h1>
              {/* //*PERMISSIONS */}
              <h1 className="text-md font-medium pl-4 flex items-center gap-x-2">
                <Asterisk color="gold" />
                Permissions
              </h1>
              {/* //* PERMISSION-ITEMS */}
              <div className="flex flex-col gap-4 py-2 ml-7 divide-y dark:divide-y-0 border-l border-dashed border-muted-foreground">
                <PERMISSION permissions={subRole?.permissions || []} />
              </div>
              {subRole?.roles && subRole?.roles.length > 0 && (
                <SubRoleRecursive subRoles={subRole?.roles} level={level + 1} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ClientRolePermissions = ({
  permissions,
  roles,
}: ClientRolePermissionsProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      {/* //*PERMISSIONS */}
      <h1 className="text-md font-medium pl-2 flex items-center gap-x-2">
        <Asterisk color="gold" />
        Permissions
      </h1>
      {/* //* PERMISSION-ITEMS */}
      <div className="flex flex-col gap-4 ml-5 divide-y dark:divide-y-0 border-l border-dashed border-muted-foreground">
        <PERMISSION permissions={permissions} />
      </div>
      {/* //* NESTED RECURSIVE ROLES */}
      <SubRoleRecursive subRoles={roles} />
    </div>
  );
};

const PERMISSION = ({ permissions }: { permissions: RolePermissions[] }) => {
  return permissions && permissions.length > 0 ? (
    permissions.map((permissionGroup, permissionIdx) => {
      const permissionOrder = permissionIdx + 1;
      return (
        <div key={permissionGroup?.id} className="px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <span>{permissionOrder}.</span>
            <span className="text-base">{permissionGroup?.name}</span>
          </div>
          {/* permission chips */}
          <div className="flex flex-wrap gap-2 pl-2">
            {permissionGroup?.components?.map((permission) => (
              <Badge
                key={permission?.id}
                variant="outline"
                className="text-primary flex items-center gap-1 px-3 py-2 hover:bg-primary/10 transition"
              >
                <Asterisk color="#f5b429" className="h-4 w-4" />
                <span className="font-normal tracking-wide">
                  {permission?.name}
                </span>
              </Badge>
            ))}
            {permissionGroup?.components?.length === 0 && (
              <div className="flex items-center gap-2 rounded-md bg-yellow-50/10 px-3 py-2 text-yellow-400 text-xs font-medium w-fit">
                <AlertCircle size={18} /> No permissions available for this
                role.
              </div>
            )}
          </div>
        </div>
      );
    })
  ) : (
    <div className="flex items-center gap-2 rounded-md bg-yellow-50/10 px-3 py-2 text-yellow-400 text-xs font-medium w-fit">
      <AlertCircle size={18} /> No permissions available for this role.
    </div>
  );
};
