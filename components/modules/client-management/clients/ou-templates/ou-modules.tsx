"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InactiveUsers, Roles, UserGroups, Users } from "./modules"
import { Asterisk, UserRound, Users2, UserX } from "lucide-react"
import { useParams } from "next/navigation"
import { decryptClient } from "@/utils/functions/encrypt/client-encryption"

type ParamType = {
  clientId: string
  ouId: string
}
export type ModulePropsTypes = {
  ouId: string
  clientId?: string
}
export const OuModules = () => {
  const params: ParamType = useParams()

  const encodedOuId = params?.ouId
  const encodedClientId = params?.clientId
  const decryptedOuId = decryptClient(encodedOuId)
  const decryptedClientId = decryptClient(encodedClientId)
  return (
    <div>
      <Tabs defaultValue="users">
        <TabsList className="space-x-3 w-full sm:w-fit">
          <TabsTrigger value="users">
            <UserRound />
            Users
          </TabsTrigger>
          <TabsTrigger value="inactive-users">
            <UserX />
            Inactive Users
          </TabsTrigger>
          <TabsTrigger value="user-groups">
            <Users2 />
            User Groups
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Asterisk />
            Roles
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Users ouId={decryptedOuId} clientId={decryptedClientId} />
        </TabsContent>
        <TabsContent value="inactive-users">
          <InactiveUsers ouId={decryptedOuId} />
        </TabsContent>
        <TabsContent value="user-groups">
          <UserGroups ouId={decryptedOuId} />
        </TabsContent>
        <TabsContent value="roles">
          <Roles ouId={decryptedOuId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
