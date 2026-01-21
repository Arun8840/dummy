"use client"
import { useRef, useState } from "react"
import {
    SurveyPublisherTemplateType,
    QuestionTypes,
    RemoveQuestionRequestTypes,
} from "@/types/survey-management/survey-types"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { PublishItems } from "./publish-items"
import { SurveyPublishers } from "./survey-publishers"
import { SurveyPublihserProvider } from "@/context/Survey-publisher-providers"

interface DesignComponentProps {
    template: SurveyPublisherTemplateType
}

export function Publish({ template }: DesignComponentProps) {
    // * HOOKS
    const lastTemplateId = useRef<string | null>(null)
    const [isEdit, setEdit] = useState<string | null>(null)
    const { data: workflowTemplates, isPending: isWorkflowPending } = trpc.workflow.templates.useQuery()
    const setPublisherTemplate = useSurveyStore((state) => state?.setPublisherTemplate)
    const setPublisher = useSurveyStore((state) => state?.addPublisher)
    const removePublisher = useSurveyStore((state) => state?.removePublisher)
    const saveQuestion = useSurveyStore((state) => state?.saveQuestion)

    const addComponent = trpc.survey.addPublihser.useMutation()
    const removeComponent = trpc.survey.removePublisher.useMutation()
    const saveComponent = trpc.survey.saveQuestion.useMutation()

    const isPending =
        addComponent?.isPending ||
        removeComponent?.isPending ||
        saveComponent?.isPending || isWorkflowPending

    // Only setTemplate if it's a different id (and with every initial mount)
    if (template && template.id && lastTemplateId.current !== template.id) {
        setPublisherTemplate?.(template)
        lastTemplateId.current = template.id
    }

    //   *drop function
    const handleDrop = async (event: DragEndEvent) => {
        // Only handle drops when there is an actual droppable target
        if (!event?.over) return

        const dragData = event?.active?.data?.current
        const targetData = event?.over?.data?.current
        const dragType = dragData?.type
        // Guard: If either dragData or targetData is missing, do nothing
        if (!dragData || !targetData) return

        if (dragType === "associatedTable") {
            const request = {
                templateId: template?.id,
                containerId: targetData?.containerId,
                componentTemplateId: dragData?.templateId,
                componentId: dragData?.id,
                tableId: dragData?.id,
                tableColumnId: null,
                componentType: dragData?.componentType,
                subComponentType: "associatedTable",
            }
            addComponent.mutate(request, {
                onSuccess(data) {
                    const updatedValue = data?.data
                    console.log('updatedValue', updatedValue);
                },
                onError(error) {
                    toast.error(error?.message, {
                        position: "top-center",
                    })
                },
            })
            return
        }

        if (dragType === "associatedTableColumn") {
            const request = {
                templateId: template?.id,
                containerId: targetData?.containerId || "",
                componentTemplateId: targetData?.componentTemplateId,
                tableId: targetData?.tableId,
                tableColumnId: dragData?.id,
                componentId: dragData?.id,
                componentType: dragData?.componentType,
                subComponentType: dragData?.subComponentType,
            }

            addComponent.mutate(request, {
                onSuccess(data) {
                    const updated = data?.data
                    // setPublisher?.(updated)
                    console.log('updated', updated);
                },
                onError(error) {
                    toast.error(error?.message, {
                        position: "top-center",
                    })
                },
            })
            console.log('request', request);
            return
        }

        const request = {
            templateId: template?.id,
            containerId: targetData?.containerId,
            componentType: dragData?.componentType,
            subComponentType: dragData?.subComponentType,
        }
        addComponent.mutate(request, {
            onSuccess(data) {
                const question = data?.data
                setPublisher?.(question)
            },
            onError(error) {
                toast.error(error?.message, {
                    position: "top-center",
                })
            },
        })
    }

    // ! remove questions
    const remove = (arg: RemoveQuestionRequestTypes) => {
        const request = {
            templateId: template?.id as string,
            ...arg,
        }
        removeComponent.mutate(request, {
            onSuccess(data) {
                removePublisher?.(request?.componentId)
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

    const save = (arg: QuestionTypes) => {
        const request = {
            componentId: arg?.id,
            containerId: arg?.containerId,
            templateId: template?.id,
            componentType: arg?.componentType,
            subComponentType: arg?.subComponentType,
            component: arg,
        }
        saveComponent.mutate(request, {
            onSuccess(data) {
                toast.success(data?.message, {
                    position: "top-center",
                })
                saveQuestion?.(request)
            },
            onError(error) {
                toast.error(error?.message, {
                    position: "top-center",
                })
            },
        })
    }

    const contextValues = {
        templateId: template?.id as string,
        remove: remove,
        save: save,
        isEdit,
        setEdit,
        isPending: isPending,
        workflowTemplates: Array.isArray(workflowTemplates)
            ? workflowTemplates
            : (workflowTemplates?.data ?? [])
    }

    return (
        <DndContext onDragEnd={handleDrop} modifiers={[restrictToWindowEdges]}>
            <SurveyPublihserProvider value={contextValues}>
                <section className="size-full grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-2 relative">
                    <PublishItems />
                    <SurveyPublishers />
                </section>
            </SurveyPublihserProvider>
        </DndContext>
    )
}

