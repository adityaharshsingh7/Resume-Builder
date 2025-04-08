
import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resumeTemplates } from "@/data/resumeTemplates";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Image } from "lucide-react";

const TemplateSelection: React.FC = () => {
  const { resume, updateResume } = useResume();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateResume("title", e.target.value);
  };

  const handleTemplateSelect = (templateId: string) => {
    updateResume("templateId", templateId);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Resume Settings</h2>
        <p className="text-muted-foreground mb-6">
          Choose a template and customize your resume
        </p>
      </div>

      <div className="space-y-2 mb-8">
        <Label htmlFor="resumeTitle">Resume Title</Label>
        <Input
          id="resumeTitle"
          value={resume.title}
          onChange={handleTitleChange}
          placeholder="e.g. My Professional Resume"
        />
        <p className="text-xs text-muted-foreground mt-1">
          This title is for your reference only and won't appear on the resume
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Select a Template</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resumeTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                resume.templateId === template.id
                  ? "ring-2 ring-resume-primary scale-[1.02]"
                  : "hover:border-resume-primary"
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="aspect-[8.5/11] relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
                      />
                    </div>
                    {resume.templateId === template.id && (
                      <div className="absolute inset-0 bg-resume-primary/10 flex items-center justify-center">
                        <div className="bg-resume-primary text-white text-xs px-2 py-1 rounded">
                          Selected
                        </div>
                      </div>
                    )}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{template.name} Template</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.name === "Simple" && "Clean and straightforward design, perfect for most industries."}
                      {template.name === "Professional" && "Formal and structured design for corporate environments."}
                      {template.name === "Modern" && "Contemporary layout with a sleek sidebar for a fresh look."}
                      {template.name === "Creative" && "Bold and distinctive design to help you stand out."}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <CardContent className="p-3">
                <div className="flex items-center justify-center">
                  <h4 className="font-medium text-center">{template.name}</h4>
                  <div className="ml-auto">
                    <Image className="h-4 w-4 text-resume-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
