"use client"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import Droppable from "@/utils/ui/dnd-components/droppable"
import { Warning } from "@/utils/ui/warning"

import { CustomCard } from "@/utils/ui/custom-card"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { MemoizedPublishers } from "./memoized-publishers"

const acceptTypes = [
    "publishWeb",
    "publishEmail",
    "publishCustom",
    "publishEmail2",
    "publishMobile",
    "publishEmbed",
    "publishPaper"
]
export const SurveyPublishers = () => {
    const template = useSurveyStore((state) => state?.surveyPublisherTemplate)

    const publishers = template?.publishers || []

    const currentChildrenLength = template?.publishers?.length ?? 0
    const additionalDropData = {
        containerId: template?.id as string,
        order: String(currentChildrenLength),
    }

    const PublihserActions = () => {
        return <div>
            <Button type="button" size={"sm"}>
                <Send /> Publish
            </Button>
        </div>
    }
    return (
        <>
            <CustomCard
                title={template?.name}
                description="Survey publishers allow you to control who can receive, view, or publish survey results. Add or configure publishers below."
                CardAction={<PublihserActions />}
            >
                <Droppable
                    id="survey-publishers"
                    type={acceptTypes}
                    className="space-y-2 flex flex-col p-2"
                    dropData={additionalDropData}
                >
                    {/*// TODO: Render publishers list or warning here */}
                    {/* //* QUESTIONS */}
                    {publishers.length > 0 ? (
                        publishers.map((pub, pubIdx) => (
                            <MemoizedPublishers publisher={pub} key={pubIdx} />
                        ))
                    ) : (
                        <Warning
                            title="Add publishers"
                            description="Use the button above or drag and drop from the publisher selector to add publishers to your survey."
                            variant="default"
                            className="border-0 bg-inherit"
                        />
                    )}
                </Droppable>
            </CustomCard>
        </>
    )
}
