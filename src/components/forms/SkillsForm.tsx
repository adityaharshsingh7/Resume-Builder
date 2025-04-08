
import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash } from "lucide-react";
import { ResumeSkill } from "@/types/resume";

const SkillsForm: React.FC = () => {
  const { resume, updateResume } = useResume();
  const { skills } = resume;

  const addSkill = () => {
    const newSkill: ResumeSkill = {
      id: crypto.randomUUID(),
      name: "",
      level: 3,
    };
    updateResume("skills", [...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    updateResume(
      "skills",
      skills.filter((skill) => skill.id !== id)
    );
  };

  const updateSkill = (id: string, field: keyof ResumeSkill, value: any) => {
    updateResume(
      "skills",
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <p className="text-muted-foreground mb-6">
          Add your key skills with proficiency levels
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/30">
          <h3 className="font-medium mb-1">No skills added yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your skills to showcase your strengths to employers
          </p>
          <Button onClick={addSkill}>
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="space-y-2">
                      <Label htmlFor={`skill-${skill.id}`}>Skill Name</Label>
                      <Input
                        id={`skill-${skill.id}`}
                        value={skill.name}
                        onChange={(e) =>
                          updateSkill(skill.id, "name", e.target.value)
                        }
                        placeholder="e.g. JavaScript, Project Management..."
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor={`level-${skill.id}`}>
                          Proficiency Level
                        </Label>
                        <span className="text-xs font-medium">
                          {["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"][
                            skill.level - 1
                          ]}
                        </span>
                      </div>
                      <Slider
                        id={`level-${skill.id}`}
                        value={[skill.level]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(value) =>
                          updateSkill(skill.id, "level", value[0])
                        }
                      />
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addSkill} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Skill
          </Button>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
