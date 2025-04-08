
import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { User, GraduationCap, Briefcase, Star, FileText } from "lucide-react";
import SavedResumes from "./SavedResumes";

const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection, resume } = useResume();

  const menuItems = [
    { id: "template", label: "Templates", icon: <FileText className="h-4 w-4" /> },
    { id: "personalInfo", label: "Personal Info", icon: <User className="h-4 w-4" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
    { id: "skills", label: "Skills", icon: <Star className="h-4 w-4" /> },
  ];

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1">{resume.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Build your professional resume step by step
        </p>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-200 ${
                activeSection === item.id 
                  ? "bg-resume-primary text-white" 
                  : "hover:bg-muted hover:translate-x-1"
              }`}
              onClick={() => setActiveSection(item.id as any)}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto border-t">
        <SavedResumes />
      </div>
    </div>
  );
};

export default Sidebar;
