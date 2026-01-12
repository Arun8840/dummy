import { Design } from "@/components/modules/survey-management/survey/design"
import { SurveySettings } from "@/components/modules/survey-management/survey/settings"
import { trpc } from "@/trpc/server"
import { Warning } from "@/utils/ui/warning"

interface DesignProps {
  params: {
    id: string
  }
}
export default async function settings({ params }: DesignProps) {
  const { id } = await params
  const settings = await trpc.survey.getTemplateSettings({ templateId: id })
  if (!id) {
    return (
      <Warning
        title="Survey settings ID Missing"
        variant="destructive"
        description="A survey settings ID is required to display this page. Please verify the URL and try again."
      />
    )
  }

  return <SurveySettings settings={settings?.data} />
}
