export interface WorkflowTemplate {
  id: string
  clientId: number
  buId: string
  folder: string | null
  version: number
  name: string
  description: string
  status: "Draft" | "Published"
  createdUserId: string
  createdDate: number
  modifiedUserId: string
  modifiedDate: number
  parentTemplateId: string
  childTemplateIds: string[] | null
  steps: Step[]
  roles: Role[] | null
  createdBy: string
  modifiedBy: string
  createdDateString: string
  modifiedDateString: string
  childTemplates: string[] | null
  copyFromTemplateId: string | null
  settings: Record<string, any> | null
}

export interface Step {
  id: string
  containerId: string
  componentType: string
  subComponentType: string
  name: string
  status: string | null
  iName: string
  order: number
  createdDate: number
  modifiedDate: number | null
  roles: Role[]
  emailTemplates: EmailTemplate[]
  emailNotification: boolean
  rules: Rule[]
  color: string
  userMap: Record<string, any> | null
  signRequired: boolean
  acknowledge: string | null
  steps: Step[] | null
  branches: Branch[] | null
  readOnly: boolean
  answerKey: boolean
}

export interface Role {
  key: string
  value: string
  trigger: string | null
}

export interface EmailTemplate {
  key: string
  value: string
  trigger: string | null
}

export interface Rule {
  id: string
  containerId: string
  name: string
  componentType: string
  subComponentType: string
  order: number
  assignTo: string | null
  gotoStep: string | null
  approvalGotoStep: string | null
  rejectGotoStep: string | null
  approveButtonLabel: string | null
  rejectButtonLabel: string | null
  ruleTitle: string
  ruleDescription: string
  beforeAfter: boolean
  approveReject: string | null
  acknowledge: string | null
  ruleAction: string | null
  ruleActionType: string | null
  flexFlowGotoSteps: string[]
  column: string | null
  columns: string[] | null
  ftpTemplateId: string | null
  ftpTemplateName: string | null
  comment: string | null
  emailTemplateId: string | null
  emailTemplateName: string | null
  reminder: string | null
}

export interface Branch {
  id?: string
  name?: string
  [key: string]: any
}

export type WorkflowTemplateResponse = WorkflowTemplate[]
