// Types grouped for better structure and reusability

import { PermissionType, RoleWithPermissions } from ".."

export interface Textbox {
  id: string
  order: number
  typeId: string
  type: string
  msg: string
  answer: string
  precision: number
  code: string
  override: boolean
  required: boolean
  instanceVariable: boolean
  skipValue: string
  skipCondition: string
  skipToQuestion: string
  branchToCategory: string
  allowScoring: boolean
  score: number
  maxLength: number
  restrictLength: boolean
  dynamic: boolean
  error: boolean
  overrideError: boolean
  scores: any[]
  permissionMap: Record<string, any>
}

// General dynamic type for similar survey objects
export type VariableMapType = {
  [key: string]: {
    id: string
    name: string
    containerId: string
    containerName: string
    iName: string
    type: string
    msg: string | null
    defaultValue: any | null
    answers: string[]
    format: string | null
    properties: any | null
    scope: any | null
    order: number
  }
}

export interface QuestionMediaFile {
  id: string
  componentId: string
  gridfsId: string
  thumbnailGridfsId: string
  fileName: string
  thumbnailFileName: string
  contentType: string
  fileSize: number
  image: boolean
}

export interface QuestionOptionType {
  id: string
  code: string
  label: string
  value: string
  allowDataColumn: boolean
  order: number
  type: string
  required: boolean
  na: boolean
  attachment: boolean
  headerColor: string
  fontColor: string
  passCondition: boolean
  conditionalColumn: boolean
  email: boolean
  answerKey: boolean
  weight: number
  iconColor: string
  permissionMap: Record<string, any>
}

export interface QuestionOptionSegmentType {
  id: string
  label: string
  code: string
  order: number
  answers: any[]
  direction: boolean
  allowOtherTextBox: boolean
  na: boolean
  override: boolean
  options: QuestionOptionType[]
  required: boolean
  roles: any[]
  permissionMap: Record<string, any>
  condition: boolean
  conditionPassed: boolean
  dynamicRow: boolean
  columnConditionPassed: boolean
  photoRequired: boolean
  dynamic: boolean
  allowDataColumn: boolean
}

export interface QuestionLogicType {
  skip: boolean
  branch: boolean
  loop: boolean
  show: boolean
  skiped: boolean
  piped: boolean
  skipId: string | null
  skipTo: boolean
}

export interface QuestionLoopCategoryType {
  key: string
  value: string
  trigger: any
}

export interface QuestionTypes {
  id: string
  containerId: string
  componentType: string
  subComponentType: string
  name: string
  description: string
  order: number
  vaults: any[]
  allowedMediaTypes: string
  mediaFiles: QuestionMediaFile[]
  maxMediaFiles: number
  permissionMap: Record<string, any>
  logic: QuestionLogicType
  scoring: boolean
  score: number
  scored: number
  weight: number
  sum: number
  averageScore: number
  weightedAverage: number
  scorePercentage: number
  answered: boolean
  code: string
  descriptionCode: string
  loopCategory: QuestionLoopCategoryType
  downloaded: boolean
  sections: number
  sectionHeight: number
  repeatable: boolean
  dynamic: boolean
  piping: boolean
  looping: boolean
  height: string
  width: string
  hide: boolean
  allowOtherTextBox: boolean
  allowComment: boolean
  na: boolean
  required: boolean
  photoRequired: boolean
  photoOptional: boolean
  timeDatePeriod: boolean
  matrixCardLayout: boolean
  visible: boolean
  randomizeOptions: boolean
  userComments: Record<string, any>
  direction: boolean
  tags: string[]
  optionSegments: QuestionOptionSegmentType[]
  showMatrixHeader: boolean
  optionComments: boolean
  optionVaults: boolean
  dynamicRows: boolean
  documentCondition: boolean
  defaultValueChanged: boolean
  columnCondition: boolean
  dropzoneInitialized: boolean
  numbering: number
  showFormula: boolean
  showSummary: boolean
  showIcon: boolean
  showIconWithLabel: boolean
  textBox: Textbox
  children: QuestionTypes[]
}

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
  children: QuestionTypes[]
  permissions: PermissionType[] | null
  roles: RoleWithPermissions[] | null
  variableNamesMap: VariableMapType
}

export type RemoveQuestionRequestTypes = {
  componentId: string
  componentType: string
  containerId: string
  templateId?: string
}

export type SurveyResponse = SurveyType[]
