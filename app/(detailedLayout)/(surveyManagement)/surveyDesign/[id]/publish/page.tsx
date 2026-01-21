import { Publish } from "@/components/modules/survey-management/survey/publish"
import { trpc } from "@/trpc/server"
import { Warning } from "@/utils/ui/warning"

interface DesignProps {
    params: {
        id: string
    }
}
export default async function publish({ params }: DesignProps) {
    const { id } = await params
    const template = await trpc.survey.getPublishTemplate({ templateId: id })
    if (!id) {
        return (
            <Warning
                title="Publish Survey Template ID Missing"
                variant="destructive"
                description="A survey template ID is required to publish this survey. Please check the URL and try again."
            />
        )
    }

    return <Publish template={template?.data} />
}
