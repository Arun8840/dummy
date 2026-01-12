"use client"
import { QuestionTypes } from "@/types/survey-management/survey-types"

// Recursively finds the index, path array, parent, containerId, and existence of a question with given id
function findQuestionIndexRecursive(
  questions: QuestionTypes[],
  id: string,
  containerId: string | null = null,
  path: number[] = []
): {
  index: number
  path: number[]
  parent: QuestionTypes | null
  containerId: string | null
  isExisting: boolean
} | null {
  for (let i = 0; i < questions.length; i++) {
    const q = questions?.[i]
    if (q?.id === id) {
      return {
        index: i,
        path: [...path, i],
        parent: null,
        containerId: containerId || q?.containerId || null,
        isExisting: true,
      }
    }
    // If has children, recurse
    if (Array.isArray(q?.children) && q.children.length > 0) {
      const res = findQuestionIndexRecursive(
        q.children,
        id,
        q?.id || containerId,
        [...path, i]
      )
      if (res && res.isExisting) {
        // Include the parent question
        return { ...res, parent: q }
      }
    }
  }
  // If not found at this level or any child levels
  return null
}

export function useGetQuestionIDX(
  items: QuestionTypes[],
  rootContainerId?: string
) {
  const getIndex = (targetId: string) => {
    const res = findQuestionIndexRecursive(
      items,
      targetId,
      rootContainerId || null
    )
    return res
      ? res
      : {
          index: -1,
          path: [],
          parent: null,
          containerId: null,
          isExisting: false,
        }
  }

  const getActiveOverIndex = (activeId: string, overId: string) => {
    return {
      active: getIndex(activeId),
      over: getIndex(overId),
    }
  }

  return {
    getIndex,
    getActiveOverIndex,
  }
}
