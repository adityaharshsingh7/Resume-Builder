import React from "react";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeContext";
import { FileText, Save, Download, Plus } from "lucide-react";

const Header: React.FC = () => {
  const { saveResume, downloadResume, createNewResume, resume } = useResume();

  return (
    <header className="bg-resume-primary text-white shadow-md">
      <div className="container mx-auto py-4 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-xl font-bold">Smart Resume Hub</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white text-resume-primary font-medium flex items-center gap-2"
              onClick={createNewResume}
            >
              <Plus className="h-4 w-4" />
              <span>New</span>
            </Button>
            
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white text-resume-primary font-medium flex items-center gap-2"
              onClick={saveResume}
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
            
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white text-resume-primary font-medium flex items-center gap-2"
              onClick={downloadResume}
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
