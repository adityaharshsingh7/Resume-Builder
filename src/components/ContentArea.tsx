
import React from "react";
import { useResume } from "@/context/ResumeContext";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";
import TemplateSelection from "./forms/TemplateSelection";

const ContentArea: React.FC = () => {
  const { activeSection } = useResume();

  const renderContent = () => {
    switch (activeSection) {
      case "personalInfo":
        return <PersonalInfoForm />;
      case "education":
        return <EducationForm />;
      case "experience":
        return <ExperienceForm />;
      case "skills":
        return <SkillsForm />;
      case "template":
        return <TemplateSelection />;
      default:
        return <TemplateSelection />;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      {renderContent()}
    </div>
  );
};

export default ContentArea;
