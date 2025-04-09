
import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { FileText, Trash } from "lucide-react";

const SavedResumes: React.FC = () => {
  const { savedResumes, loadResume, deleteResume } = useResume();

  if (savedResumes.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No saved resumes yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className="font-medium mb-3">Your Saved Resumes</h3>
      <div className="space-y-3">
        {savedResumes.map((savedResume) => (
          <Card key={savedResume.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-resume-secondary" />
                  <div>
                    <h4 className="font-medium text-sm">{savedResume.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      Updated {formatDistanceToNow(new Date(savedResume.lastUpdated), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-xs"
                    onClick={() => loadResume(savedResume.id)}
                  >
                    Open
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => deleteResume(savedResume.id)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedResumes;
