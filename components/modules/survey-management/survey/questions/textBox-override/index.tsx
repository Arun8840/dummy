"use client"
import { DesignQuestionComponentProps } from "@/types"
import React from "react"
import { Input } from "@/components/ui/input"
import { QuestionWrapper } from "../../design/question-wrapper"
import { Label } from "@/components/ui/label"
import { Asterisk } from "lucide-react"
import CheckboxGroup from "@/utils/ui/checkBox-group"
export const TextboxOverride: React.FC<DesignQuestionComponentProps> = ({
  value,
}) => {
  const questionLabel = value?.textBox?.label ?? null
  const isRequired = value.required
  const answer = value?.textBox?.answer ?? ""
  const isOverrided = value?.textBox?.override
  return (
    <QuestionWrapper question={value}>
      {questionLabel && (
        <Label className="pb-3">
          {isRequired && <Asterisk size={"16"} className="text-destructive" />}
          {questionLabel}
        </Label>
      )}
      <Input className="w-1/2" defaultValue={answer} />

      <CheckboxGroup
        id={`override-${value?.id}`}
        label="Override ?"
        checked={!!isOverrided}
        className="size-fit"
      />

      {isOverrided && (
        <>
          <Input
            className="w-1/2"
            defaultValue={value?.textBox?.overrideAnswer}
          />
          <Input
            className="w-1/2"
            defaultValue={value?.textBox?.overrideReason}
          />
        </>
      )}
    </QuestionWrapper>
  )
}
