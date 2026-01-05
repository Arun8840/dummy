export interface SurveyType {
  id: string
  clientId: string
  ouId: string
  version: number
  name: string
  color: string
  status: string
  fileSize: number
  createdUserId: string
  createdBy: string
  createdDate: string
  createdDateString: string
  modifiedUserId: string
  modifiedBy: string
  modifiedDate: string
  modifiedDateString: string
  weight: number
  sum: number
  average: number
  scoring: boolean
  score: number
  scored: number
  averageScore: number
  scorePercentage: number
  weightedAverage: number
  answered: boolean
  defaultValueChanged: boolean
}

export type SurveyResponse = SurveyType[]
