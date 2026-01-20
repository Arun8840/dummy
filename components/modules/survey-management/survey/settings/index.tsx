"use client"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SurveySettingsResponse,
  SurveySettingsTypes,
} from "@/types/survey-management/survey-types"
import {
  ClipboardList,
  Table2,
  Tag,
  Lock,
  Workflow,
  Undo2,
  Save,
} from "lucide-react"
import { TableSettings } from "./tab-items/table"
import { TagSettings } from "./tab-items/tag"
import { VaultSettings } from "./tab-items/vault"
import { WorkflowSettings } from "./tab-items/workflow"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Survey } from "./tab-items/survey"
import { trpc } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

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
  const saveSettingsTemplate = trpc.survey.saveTemplateSettings.useMutation()

  const saveSettings: SubmitHandler<SurveySettingsTypes> = (data) => {
    saveSettingsTemplate.mutate(data, {
      onSuccess(data) {
        toast.success(data?.message, {
          position: "top-center",
        })
      },
      onError(error) {
        toast.error(error?.message, {
          position: "top-center",
        })
      },
    })
  }
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(saveSettings)}>
          <Tabs defaultValue="Survey">
            <div className="flex items-center justify-between sticky top-2 z-3">
              <TabsList>
                {tabsItems?.map((tab, tabIdx) => (
                  <TabsTrigger key={`${tab}_${tabIdx}`} value={tab?.label}>
                    {tab?.icon}
                    {tab?.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex items-center gap-2">
                <Button
                  disabled={saveSettingsTemplate?.isPending}
                  type="button"
                  onClick={() => form.reset({ ...settings })}
                  size={"sm"}
                  variant={"outline"}
                >
                  <Undo2 />
                  Reset Settings
                </Button>
                <Button
                  disabled={saveSettingsTemplate?.isPending}
                  type="submit"
                  size={"sm"}
                >
                  {saveSettingsTemplate?.isPending ? (
                    <>
                      <Spinner className="text-secondary" />
                      Saving settings, please wait...
                    </>
                  ) : (
                    <>
                      <Save />
                      Save Settings
                    </>
                  )}
                </Button>
              </div>
            </div>

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
          </Tabs>
        </form>
      </FormProvider>
    </div>
  )
}
