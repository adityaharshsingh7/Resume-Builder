
import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { ResumeEducation } from "@/types/resume";

const EducationForm: React.FC = () => {
  const { resume, updateResume } = useResume();
  const { education } = resume;

  const addEducation = () => {
    const newEducation: ResumeEducation = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };
    updateResume("education", [...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    updateResume(
      "education",
      education.filter((edu) => edu.id !== id)
    );
  };

  const updateEducation = (id: string, field: keyof ResumeEducation, value: string) => {
    updateResume(
      "education",
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <p className="text-muted-foreground mb-6">
          Add your educational background information
        </p>
      </div>

      {education.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/30">
          <h3 className="font-medium mb-1">No education added yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your educational history to enhance your resume
          </p>
          <Button onClick={addEducation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu) => (
            <Card key={edu.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {edu.institution || "New Education Entry"}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, "institution", e.target.value)
                      }
                      placeholder="University or School Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`location-${edu.id}`}>Location</Label>
                    <Input
                      id={`location-${edu.id}`}
                      value={edu.location}
                      onChange={(e) =>
                        updateEducation(edu.id, "location", e.target.value)
                      }
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, "degree", e.target.value)
                      }
                      placeholder="e.g. Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                    <Input
                      id={`field-${edu.id}`}
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        updateEducation(edu.id, "fieldOfStudy", e.target.value)
                      }
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${edu.id}`}
                      type="month"
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(edu.id, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${edu.id}`}
                      type="month"
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(edu.id, "endDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${edu.id}`}>Description</Label>
                  <Textarea
                    id={`description-${edu.id}`}
                    value={edu.description}
                    onChange={(e) =>
                      updateEducation(edu.id, "description", e.target.value)
                    }
                    placeholder="Describe your studies, achievements, activities..."
                    className="h-24"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addEducation} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Education
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
