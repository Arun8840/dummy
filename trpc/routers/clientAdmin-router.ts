import { createTRPCRouter } from "../init";
import { clientUserRouters } from "@/components/modules/client-admin/procedure";

export const clientAdminRouters = createTRPCRouter({
  users: clientUserRouters,
});
