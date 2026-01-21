"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, Workflow } from "lucide-react"
import { PublishTree } from "./publish-design-tree"
import { PublishDragItems } from "./publish-design-items"

export const PublishItems = () => {
  return (
    <Tabs defaultValue="tree" className="size-full">
      <TabsList className="border w-full">
        <TabsTrigger value="tree">
          <Workflow />
          Tree
        </TabsTrigger>
        <TabsTrigger value="items">
          <List />
          Items
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tree">
        <PublishTree />
      </TabsContent>
      <TabsContent value="items">
        <PublishDragItems />
      </TabsContent>
    </Tabs>
  )
}
