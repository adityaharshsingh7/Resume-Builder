import React from "react";
import { useResume } from "@/context/ResumeContext";
import SimpleTemplate from "./templates/SimpleTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

const ResumePreview: React.FC = () => {
  const { resume } = useResume();
  const { templateId } = resume;

  const renderTemplate = () => {
    switch (templateId) {
      case "simple":
        return <SimpleTemplate />;
      case "professional":
        return <ProfessionalTemplate />;
      case "modern":
        return <ModernTemplate />;
      case "creative":
        return <CreativeTemplate />;
      default:
        return <SimpleTemplate />;
    }
  };

  return (
    <div className="h-full overflow-auto bg-gray-100 p-6 flex justify-center">
      <div className="transform scale-[0.7] origin-top print:scale-100">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
