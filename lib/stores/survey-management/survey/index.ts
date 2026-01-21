import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { initailSurveyState, SurveyStateTypes } from "./initial-state"
import { DragComponentTypes } from "@/types"
import {
  QuestionTypes,
  SaveQuestionRequestType,
  SurveyPublisherTemplateType,
  SurveyType,
} from "@/types/survey-management/survey-types"
export const useSurveyStore = create<SurveyStateTypes>()(
  immer((set) => ({
    ...initailSurveyState,

    setTemplate: (template: SurveyType) => {
      set({ surveyTemplate: template })
    },
    setPublisherTemplate: (template: SurveyPublisherTemplateType) => {
      set({ surveyPublisherTemplate: template })
    },

    setDragItems: (dragItems: DragComponentTypes[]) => {
      set({ components: dragItems })
    },

    addQuestion: (question) => {
      set((state) => {
        const template = state?.surveyTemplate
        if (!template) return
        if (!Array.isArray(template?.children)) return

        // Helper recursive function to find and insert the question
        const insertIntoMatchingContainer = (nodes: QuestionTypes[]) => {
          if (!Array.isArray(nodes)) return

          for (const node of nodes) {
            if (node?.id === question?.containerId) {
              if (!Array.isArray(node?.children)) return

              node.children.push(question)
              return true // Successful insert, stop recursion
            }
            // Continue recursion if node has children
            if (Array.isArray(node?.children)) {
              if (insertIntoMatchingContainer(node.children)) {
                return true
              }
            }
          }
          return false
        }

        // If question goes to top-level
        if (question?.containerId === template?.id) {
          template.children.push(question)
        } else {
          insertIntoMatchingContainer(template?.children || [])
        }
      })
    },
    removeQuestion: (requestArg) => {
      set((state) => {
        const template = state?.surveyTemplate
        if (!template) return
        if (!Array.isArray(template?.children)) return

        // Recursive function to find and remove the question/component
        const removeFromNodes = (nodes: QuestionTypes[]) => {
          if (!Array.isArray(nodes)) return false
          for (const node of nodes) {
            // If the parent container matches, remove the child from this node's children
            if (
              node?.id === requestArg?.containerId &&
              Array.isArray(node?.children)
            ) {
              node.children = node?.children.filter(
                (child) => child?.id !== requestArg?.componentId
              )
              return true // Stopping after removing
            }
            // Otherwise, recurse if this node has children
            if (Array.isArray(node?.children)) {
              if (removeFromNodes(node.children)) {
                return true
              }
            }
          }
          return false
        }

        // If the container is the top template (top level)
        if (requestArg?.containerId === template?.id) {
          template.children = template.children.filter(
            (cat) => cat?.id !== requestArg?.componentId
          )
        } else {
          removeFromNodes(template?.children || [])
        }
      })
    },

    saveQuestion: (saveArg: SaveQuestionRequestType) => {
      const { component, componentId, containerId } = saveArg
      set((state) => {
        const template = state?.surveyTemplate
        if (!template || !Array.isArray(template?.children)) return

        // Helper to update question by id recursively using for...of (simpler and clearer)
        const updateQuestionById = (nodes: QuestionTypes[]): boolean => {
          for (const node of nodes) {
            if (node.id === containerId && Array.isArray(node.children)) {
              for (const child of node.children) {
                if (child.id === componentId) {
                  Object.assign(child, component)
                  return true
                }
              }
              // Deep search in grandchildren if not found
              for (const child of node?.children) {
                if (
                  Array.isArray(child.children) &&
                  updateQuestionById(child.children)
                ) {
                  return true
                }
              }
            } else if (Array.isArray(node.children)) {
              if (updateQuestionById(node.children)) return true
            }
          }
          return false
        }

        // Top-level update
        if (containerId === template.id) {
          for (const child of template.children) {
            if (child.id === componentId) {
              Object.assign(child, component)
              return
            }
          }
        } else {
          updateQuestionById(template.children)
        }
      })
    },

    editQuestion: (question) => {
      set((state) => {
        state.editableQuestion = question
      })
    },

    // * FOR PUBLISHERS

    addPublisher: (response) => {
      set((state) => {
        const template = state?.surveyPublisherTemplate
        if (!template) return
        if (!Array.isArray(template?.publishers)) return

        template?.publishers?.push(response)
      })
    },
    removePublisher: (publihserId) => {
      set((state) => {
        const template = state?.surveyPublisherTemplate
        if (!template) return
        if (!Array.isArray(template?.publishers)) return

        // Remove publisher using filter
        template.publishers = template.publishers.filter(
          (publisher) => publisher.id !== publihserId
        )
      })
    },
  }))
)
