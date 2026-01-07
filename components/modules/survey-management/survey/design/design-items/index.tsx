"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DesignDragItems } from './survey-design-items'
import { List, Workflow } from 'lucide-react'
import { DesignTree } from './survey-design-tree'

export const DesignItems = () => {
    return (
        <Tabs defaultValue="items" className='size-full'>
            <TabsList className='border w-full'>
                <TabsTrigger value="tree"><Workflow />Tree</TabsTrigger>
                <TabsTrigger value="items"><List />Items</TabsTrigger>
            </TabsList>
            <TabsContent value="tree">
                <DesignTree />
            </TabsContent>
            <TabsContent value="items">
                <DesignDragItems />
            </TabsContent>
        </Tabs>
    )
}
// const { isPending, data, error } = trpc.survey.questions.useQuery()