import React, { createContext, useContext, useState, useEffect } from "react";
import { Resume, ResumeSection } from "../types/resume";
import { defaultResume } from "../data/resumeTemplates";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ResumeContextType {
  resume: Resume;
  activeSection: ResumeSection;
  setActiveSection: (section: ResumeSection) => void;
  updateResume: <K extends keyof Resume>(key: K, value: Resume[K]) => void;
  savedResumes: Resume[];
  saveResume: () => void;
  loadResume: (id: string) => void;
  deleteResume: (id: string) => void;
  createNewResume: () => void;
  downloadResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<Resume>({ ...defaultResume, id: crypto.randomUUID() });
  const [activeSection, setActiveSection] = useState<ResumeSection>("template");
  const [savedResumes, setSavedResumes] = useState<Resume[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedResumes = localStorage.getItem("savedResumes");
    if (storedResumes) {
      setSavedResumes(JSON.parse(storedResumes));
    }
  }, []);

  const updateResume = <K extends keyof Resume>(key: K, value: Resume[K]) => {
    setResume((prev) => ({ ...prev, [key]: value }));
  };

  const saveResume = () => {
    const updatedResumes = [...savedResumes, resume];
    setSavedResumes(updatedResumes);
    localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));
    toast({
      title: "Success",
      description: "Your resume has been saved!",
    });
  };

  const loadResume = (id: string) => {
    const resumeToLoad = savedResumes.find((r) => r.id === id);
    if (resumeToLoad) {
      setResume(resumeToLoad);
      toast({
        title: "Success",
        description: "Resume loaded successfully!",
      });
    } else {
      toast({
        title: "Error",
        description: "Resume not found!",
        variant: "destructive",
      });
    }
  };

  const deleteResume = (id: string) => {
    const updatedResumes = savedResumes.filter((r) => r.id !== id);
    setSavedResumes(updatedResumes);
    localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));
    toast({
      title: "Success",
      description: "Resume deleted successfully!",
    });
  };

  const createNewResume = () => {
    setResume({ ...defaultResume, id: crypto.randomUUID() });
    setActiveSection("template");
  };

  const downloadResume = async () => {
    try {
      toast({
        title: "Processing",
        description: "Preparing your resume for download...",
      });
      
      const resumeElement = document.querySelector('.resume-page');
      if (!resumeElement) {
        throw new Error("Resume element not found");
      }
      
      document.body.classList.add('generating-pdf');
      
      const clone = resumeElement.cloneNode(true) as HTMLElement;
      clone.classList.add('pdf-export');
      clone.style.width = '8.5in';
      clone.style.height = 'auto';
      clone.style.minHeight = '11in';
      clone.style.transform = 'scale(1)';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      document.body.appendChild(clone);
      
      const textElements = clone.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      textElements.forEach(el => {
        const element = el as HTMLElement;
        element.style.overflow = 'visible';
        element.style.whiteSpace = 'normal';
        element.style.wordBreak = 'break-word';
        element.style.lineHeight = '1.5';
        element.style.maxWidth = '100%';
      });
      
      if (resume.templateId === 'modern') {
        const sidebar = clone.querySelector('.w-1\\/3.absolute') as HTMLElement;
        const mainContent = clone.querySelector('.ml-1\\/3.w-2\\/3') as HTMLElement;
        
        if (sidebar) {
          sidebar.style.position = 'absolute';
          sidebar.style.width = '33.333%';
          sidebar.style.height = '100%';
          sidebar.style.top = '0';
          sidebar.style.left = '0';
          sidebar.style.overflow = 'visible';
        }
        
        if (mainContent) {
          mainContent.style.position = 'absolute';
          mainContent.style.width = '66.666%';
          mainContent.style.top = '0';
          mainContent.style.right = '0';
          mainContent.style.marginLeft = '33.333%';
          mainContent.style.overflow = 'visible';
        }
      }
      
      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
        imageTimeout: 15000,
        windowWidth: 8.5 * 96,
        windowHeight: 11 * 96,
      });
      
      document.body.removeChild(clone);
      document.body.classList.remove('generating-pdf');
      
      const imgWidth = 8.5 * 72;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [imgWidth, imgHeight]
      });
      
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0), 
        'JPEG', 
        0, 
        0, 
        imgWidth, 
        imgHeight, 
        undefined, 
        'FAST'
      );
      
      pdf.save(`${resume.title || 'resume'}.pdf`);
      
      toast({
        title: "Success",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error",
        description: "There was a problem downloading your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value = {
    resume,
    activeSection,
    setActiveSection,
    updateResume,
    savedResumes,
    saveResume,
    loadResume,
    deleteResume,
    createNewResume,
    downloadResume,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

    
