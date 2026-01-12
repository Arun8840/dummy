import { DesignQuestionComponentProps } from "@/types"
import React from "react"
import { Input } from "@/components/ui/input"
import { QuestionWrapper } from "../../design/question-wrapper"
import { Label } from "@/components/ui/label"
import { Asterisk } from "lucide-react"
export const MultipleTextBox: React.FC<DesignQuestionComponentProps> = ({
  value,
}) => {
  const answer = value?.textBox?.answer ?? ""
  const textBoxes = value?.multipleTextBox || []
  return (
    <QuestionWrapper question={value}>
      <div className="flex flex-col gap-y-2">
        {textBoxes?.map((box, boxIdx) => {
          const isRequired = box?.required
          const label = box?.label
          return (
            <div key={box?.id}>
              {label && (
                <Label htmlFor={box?.id} className="pb-3">
                  {isRequired && (
                    <Asterisk size={"16"} className="text-destructive" />
                  )}
                  {label}
                </Label>
              )}
              <Input id={box?.id} className="w-1/2" defaultValue={answer} />
            </div>
          )
        })}
      </div>
    </QuestionWrapper>
  )
}
