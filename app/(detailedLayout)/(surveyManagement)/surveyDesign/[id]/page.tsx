import { Design } from "@/components/modules/survey-management/survey/design"
import { trpc } from "@/trpc/server"
import { Warning } from "@/utils/ui/warning"

interface DesignProps {
  params: {
    id: string
  }
}
export default async function design({ params }: DesignProps) {
  const { id } = await params
  const template = await trpc.survey.template({ templateId: id })
  if (!id) {
    return (
      <Warning
        title="Survey Design ID Missing"
        variant="destructive"
        description="A survey design ID is required to display this page. Please verify the URL and try again."
      />
    )
  }
  return <Design template={template?.data} />
}
