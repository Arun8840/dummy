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
  overrideAnswer: string
  overrideReason: string
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
  label: string
  variableName: string
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
  multipleTextBox: Textbox[]
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

export type SaveQuestionRequestType = {
  componentId: string
  containerId: string
  templateId: string
  componentType: string
  subComponentType: string
  component: QuestionTypes
}
export type RemoveQuestionRequestTypes = {
  componentId: string
  componentType: string
  containerId: string
  templateId?: string
}

export type SurveyResponse = SurveyType[]

//* SETTINGS
export interface SurveySettingsTypes {
  whiteLabel: boolean
  headerColor: string | null
  headerFontColor: string | null
  logoPosition: number
  gridfsId: string | null
  fileName: string | null
  fileSize: number
  surveyLogo: string | null
  helpGridfsId: string | null
  helpFileName: string | null
  helpFileSize: number
  surveyHelp: boolean
  requiredMessage: string | null
  titleColor: string | null
  descriptionColor: string | null
  inputControlColor: string | null
  allowFooter: boolean
  footerMessage: string | null
  footerColor: string | null
  footerFontColor: string | null
  ribbonColor: string | null
  ribbonFontColor: string | null
  sideMenuColor: string | null
  sideMenuFontColor: string | null
  maxImagesPerComponent: number
  maxFileSize: number
  imageCompressionPercentage: number
  showQuestionNumber: boolean
  cardlayout: boolean
  showSurveyDetails: boolean
  showUploadPhoto: boolean
  uploadToCategories: boolean
  allowDragImagesFromCategories: boolean
  allowDownloadReportBeforeComplete: boolean
  allowPunchList: boolean
  showTags: boolean
  allowTableMapping: boolean
  allowUploadImageGallery: boolean
  labelColorMap: Record<string, any> | null
  optionSettings: boolean
  tagTemplateId: string | null
  zsTableId: string | null
  vaultTemplateId: string | null
  workflowTemplateId: string | null
  preFilledVaultTemplateId: string | null
  layoutTemplateId: string | null
  brandingTemplateId: string | null
  variableTemplateId: string | null
  reTakeRestriction: boolean
  reTakeMonthMap: Record<string, number>
  reTakeMonths: number
  vaultPermissionMap: Record<string, any> | null
  editCompletedSurveyPermissionMap: Record<string, any> | null
  surveyReport: boolean
  preSurveyReport: boolean
  surveyScoreReport: boolean
  surveyAnalysisReport: boolean
  allowLogic: boolean
  allowPiping: boolean
  allowLooping: boolean
  allowPreviousButton: boolean
  allowNextButton: boolean
  previousButtonLabel: string
  nextButtonLabel: string
  submitButtonLabel: string
  allowBackButton: boolean
  allowSaveButton: boolean
  backButtonLabel: string
  saveButtonLabel: string
  calculateScores: boolean
  showScores: boolean
  showSummary: boolean
  referenceImages: boolean
  showQuestionAnswerStatus: boolean
  recordGeoLocation: boolean
  exportScorePercentage: string
  roleBasedLogic: boolean
  allowDefaultValues: boolean
  allowMatrixCustomization: boolean
  includeSkippedCategoryInCalculations: boolean
  exportInprogressSurveys: boolean
  allowSurveyAttributes: boolean
  allowFtpSettings: boolean
  allowFilePattern: boolean
  allowPostalMail: boolean
  fileUploadTypes: any | null
  scoring: boolean
  weight: boolean
  variables: boolean
  answerKey: boolean
  displaySurveyTitleOnTheFirstPage: boolean
  noAttachmentsOnTheReport: boolean
  multilingual: boolean
  multilingualSelection: boolean
  allowPublishScheduleLater: boolean
  allowPublishRecurring: boolean
  allowPublishOverrideWorkflow: boolean
  allowPublishOverrideTheme: boolean
  allowSurveyLayoutSelection: boolean
  allowPublishMassDeploy: boolean
  allowDynamicTextField: boolean
  allowDynamicRow: boolean
  allowConditionalColumn: boolean
  allowOfflineSurvey: boolean
  allowPhotoUpload: boolean
  allowConditionalRow: boolean
  allowAttachmentType: boolean
  allowColumnFormula: boolean
  allowComment: boolean
  allowNAOption: boolean
  allowTexboxMaxCharacterLimit: boolean
  texboxMaxCharacter: number
  workflowControlledCategory: boolean
  workflowControlledUserRole: string | null
  parallelSurvey: boolean
  editableDataColumn: boolean
  surveyNameNotShowInInstance: boolean
}

export type SurveySettingsResponse = SurveySettingsTypes


// * PUBLIHSERS

export interface FilterColumnType {
  id: string;
  containerId: string;
  name: string;
  displayName: string;
  iName: string;
  index: number;
  componentType: string;
  subComponentType: string;
  type: string;
  path: string;
  valuePath: string;
  valueString: string | null;
  valueDouble: number;
  valueBoolean: boolean;
  valueDate: string | null;
  valueInteger: number;
  vaults: any | null;
  hidden: boolean;
  createIndex: boolean;
  searchable: boolean;
  showInReports: boolean;
  showInInstance: boolean;
  mapColumn: boolean;
  lookup: any | null;
}

export interface FilterType {
  column: FilterColumnType;
  values: string[];
  dataValues: string[];
}

export interface AssociateTables {
  aaTableId: string;
  containerId: string;
  table: {
    id: string;
    templateId: string;
    name: string;
    type: string;
    emailColumns: string[];
    keywords: string[];
  };
  tableName: string;
  primaryColumn: string;
  primaryColumnValue: string | null;
  primaryColumnLabel: string;
  password: string | null;
  userPassword: string | null;
  passwordLabel: string;
  submitButtonLabel: string | null;
  emailColumn: string | null;
  filters: FilterType[];
}

export interface PublisherComponentType {
  id: string
  containerId: string
  componentType: string
  subComponentType: string
  name: string
  status: boolean
  undeployExistingSurveys: boolean
  url: string | null
  encodedUrl: string | null
  multipleResponse: boolean
  editReponse: boolean
  showResults: boolean
  displayOption: number
  embedCode: string | null
  iframeCode: string | null
  displayWidth: string | null
  displayHeight: string | null
  subject: string | null
  emailContent: string | null
  sendInviteToAnonymousUser: boolean
  customEmail: boolean
  externalContacts: boolean
  contactTableId: string | null
  contactTable: any | null
  sender: string | null
  passwordProtect: boolean
  passwordRequired: boolean
  password: string | null
  userPassword: string | null
  passwordLabel: string | null
  submitButtonLabel: string | null
  qrGridfsId: string | null
  qrCodefileName: string | null
  associateTable: boolean
  contacts: any | null
  associatedTables: AssociateTables[]
  roleMap: any | null
  cronString: string | null
  massDeploy: boolean
  undeployURLAfterSurveyComplete: boolean
  overrideWorkflow: boolean
  workflowId: string | null
  filenamePattern: string | null
  filenamePatternKeywordMap: any | null
  ftpSettings: {
    id: string | null
    name: string | null
    containerId: string | null
    fileType: string | null
    ftpHost: string | null
    ftpPort: number
    ftpUser: string | null
    ftpPassword: string | null
    ftpDirectory: string | null
    ftpFileName: string | null
    ftpSshKey: string | null
    sshKey: boolean
    passPhrase: string | null
    cronString: string | null
    cronHelp: string | null
    delimiter: string | null
    delimiters: string | null
  }
  postalAddress: string | null
  postalAddressKeywordMap: any | null
  postalSurveyReport: boolean
  postalVaultId: string | null
  ftpTemplateId: string | null
  ftpTemplateName: string | null
  scheduleLater: boolean
  scheduleDate: string | null
  scheduledTimezone: string | null
  hour: string | null
  minute: string | null
  ampm: string | null
  recurring: boolean
  recurringTypes: string[]
  recurringType: string | null
  recurringIntervel: number
  numberOfRecurring: number
  enableMessage: boolean
  messages: any[]
  messagePermissionMap: { [key: string]: any }
  overrideTheme: boolean
  themetemplateId: string | null
  defaultLanguage: {
    key: string
    value: string
    trigger: string | null
  }
  allowedTranslations: any[]
  allowRecordCreation: boolean
}

export interface SurveyPublisherTemplateType {
  id: string
  clientId: string
  ouId: string
  name: string
  iName: string
  description: string
  status: string
  createdUserId: string
  createdDate: string
  modifiedUserId: string
  modifiedDate: string
  createdBy: string | null
  modifiedBy: string | null
  createdDateString: string | null
  modifiedDateString: string | null
  publishers: PublisherComponentType[]
}
