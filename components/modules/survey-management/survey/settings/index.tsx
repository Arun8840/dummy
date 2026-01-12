"use client"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SurveySettingsResponse,
  SurveySettingsTypes,
} from "@/types/survey-management/survey-types"
import { ClipboardList, Table2, Tag, Lock, Workflow } from "lucide-react"
import { TableSettings } from "./tab-items/table"
import { TagSettings } from "./tab-items/tag"
import { VaultSettings } from "./tab-items/vault"
import { WorkflowSettings } from "./tab-items/workflow"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Survey } from "./tab-items/survey"

interface SurveySettingsProps {
  settings: SurveySettingsResponse
}

const tabsItems = [
  { label: "Survey", icon: <ClipboardList /> },
  { label: "Table", icon: <Table2 /> },
  { label: "Tag", icon: <Tag /> },
  { label: "Vault", icon: <Lock /> },
  { label: "Workflow", icon: <Workflow /> },
]
export const SurveySettings: React.FC<SurveySettingsProps> = ({ settings }) => {
  // * HOOKS
  const form = useForm<SurveySettingsTypes>({
    defaultValues: { ...settings },
  })

  const saveSettings: SubmitHandler<SurveySettingsTypes> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Tabs defaultValue="Survey">
        <TabsList>
          {tabsItems?.map((tab, tabIdx) => (
            <TabsTrigger key={`${tab}_${tabIdx}`} value={tab?.label}>
              {tab?.icon}
              {tab?.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(saveSettings)}>
            <TabsContent value="Survey">
              <Survey />
            </TabsContent>
            <TabsContent value="Table">
              <TableSettings />
            </TabsContent>
            <TabsContent value="Tag">
              <TagSettings />
            </TabsContent>
            <TabsContent value="Vault">
              <VaultSettings />
            </TabsContent>
            <TabsContent value="Workflow">
              <WorkflowSettings />
            </TabsContent>
          </form>
        </FormProvider>
      </Tabs>
    </div>
  )
}
