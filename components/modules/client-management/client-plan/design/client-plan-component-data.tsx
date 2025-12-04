"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClientPlan } from "@/types/client-management/client-plan-types";
import { ClientRolePermissions } from "../components/client-role-and-permissions";

interface ClientPlanComponentProps {
  plan: ClientPlan;
}

export const ClientPlanComponentData = ({ plan }: ClientPlanComponentProps) => {
  const { name, roles, description } = plan || {};

  return (
    <Card className="font-sans">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {roles?.map((role, roleIdx) => {
            const roleOrder = roleIdx + 1;
            const firstDefaultOpenRole = roleIdx === 0 ? role?.id : role?.id;
            return (
              <Accordion
                key={role?.id}
                type="single"
                collapsible
                defaultValue={firstDefaultOpenRole}
              >
                <AccordionItem value={role?.id}>
                  <AccordionTrigger className="px-1 pt-0 text-md">
                    {roleOrder}.&nbsp;{role?.name}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance px-4 font-sans">
                    <ClientRolePermissions
                      roles={role?.roles}
                      permissions={role?.permissions || []}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
