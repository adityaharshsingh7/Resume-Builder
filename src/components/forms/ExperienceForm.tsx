
import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash } from "lucide-react";
import { ResumeExperience } from "@/types/resume";

const ExperienceForm: React.FC = () => {
  const { resume, updateResume } = useResume();
  const { experience } = resume;

  const addExperience = () => {
    const newExperience: ResumeExperience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      isCurrentJob: false,
    };
    updateResume("experience", [...experience, newExperience]);
  };

  const removeExperience = (id: string) => {
    updateResume(
      "experience",
      experience.filter((exp) => exp.id !== id)
    );
  };

  const updateExperience = (
    id: string,
    field: keyof ResumeExperience,
    value: any
  ) => {
    updateResume(
      "experience",
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        <p className="text-muted-foreground mb-6">
          Add your relevant work experience
        </p>
      </div>

      {experience.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/30">
          <h3 className="font-medium mb-1">No experience added yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your work history to showcase your professional background
          </p>
          <Button onClick={addExperience}>
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((exp) => (
            <Card key={exp.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {exp.position || "New Position"}
                    {exp.company ? ` at ${exp.company}` : ""}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${exp.id}`}>Position</Label>
                    <Input
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, "position", e.target.value)
                      }
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`location-${exp.id}`}>Location</Label>
                  <Input
                    id={`location-${exp.id}`}
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, "location", e.target.value)
                    }
                    placeholder="City, State or Remote"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`current-job-${exp.id}`}
                          checked={exp.isCurrentJob}
                          onCheckedChange={(checked) =>
                            updateExperience(exp.id, "isCurrentJob", checked)
                          }
                        />
                        <Label
                          htmlFor={`current-job-${exp.id}`}
                          className="text-xs"
                        >
                          Current Job
                        </Label>
                      </div>
                    </div>
                    <Input
                      id={`end-date-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "endDate", e.target.value)
                      }
                      disabled={exp.isCurrentJob}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${exp.id}`}>
                    Job Description & Responsibilities
                  </Label>
                  <Textarea
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, "description", e.target.value)
                    }
                    placeholder="Describe your responsibilities, achievements, and skills used..."
                    className="h-32"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addExperience} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Experience
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
