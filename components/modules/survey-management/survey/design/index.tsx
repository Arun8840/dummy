"use client"
import { SurveyType } from "@/types/survey-management/survey-types";
import { DesignDragItems } from "./survey-design-items";

interface DesignComponentProps {
    template: SurveyType
}
export function Design({ template }: DesignComponentProps) {

    console.log('template', template?.children);
    return (
        <section className="">
            <DesignDragItems />
        </section>
    );
}

