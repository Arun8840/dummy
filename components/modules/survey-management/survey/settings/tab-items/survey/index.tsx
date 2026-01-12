import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"
import {
  AdvancedPublishSettings,
  AdvancedQuestionSettings,
  CategorySettings,
  CompletionRetakeSettings,
  GeneralSettings,
  PdfExportSettings,
  PdfReportSettings,
  QuestionSettings,
  SurveyLogicSettings,
  TranslationSettings,
} from "./items"
import { CustomCard } from "@/utils/ui/custom-card"

export const Survey = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-2">
      <CustomCard
        title="General"
        description="Set basic survey information such as name, overview, and survey visibility."
      >
        <GeneralSettings />
      </CustomCard>
      <CustomCard
        title="Categories"
        description="Manage and organize categories within your survey."
      >
        <CategorySettings />
      </CustomCard>
      <CustomCard
        title="Questions"
        description="Adjust default options and validation for survey questions."
      >
        <QuestionSettings />
      </CustomCard>
      <CustomCard
        title="Logic"
        description="Configure branching, conditional logic, and rules for navigating your survey."
      >
        <SurveyLogicSettings />
      </CustomCard>
      <CustomCard
        title="PDF Report"
        description="Customize the look and content of generated PDF reports."
      >
        <PdfReportSettings />
      </CustomCard>
      <CustomCard
        title="PDF Export"
        description="Set options for exporting survey data to PDF files."
      >
        <PdfExportSettings />
      </CustomCard>

      <CustomCard
        title="Completion & Retake"
        description="Control what happens when users complete or retake your survey."
      >
        <CompletionRetakeSettings />
      </CustomCard>
      <CustomCard
        title="Translations"
        description="Manage language options and add survey translations."
      >
        <TranslationSettings />
      </CustomCard>
      <CustomCard
        title="Publishing"
        description="Configure advanced publishing controls and access restrictions."
      >
        <AdvancedPublishSettings />
      </CustomCard>

      <CustomCard
        title="Advanced Question Options"
        description="Fine-tune advanced settings and behaviors for survey questions."
      >
        <AdvancedQuestionSettings />
      </CustomCard>
    </div>
  )
}
