
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

  // Load saved resumes from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("savedResumes");
    if (savedData) {
      try {
        setSavedResumes(JSON.parse(savedData));
      } catch (e) {
        console.error("Error loading saved resumes:", e);
      }
    }
  }, []);

  const updateResume = <K extends keyof Resume>(key: K, value: Resume[K]) => {
    setResume((prev) => ({
      ...prev,
      [key]: value,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const saveResume = () => {
    const updatedResume = {
      ...resume,
      lastUpdated: new Date().toISOString(),
    };

    const existingIndex = savedResumes.findIndex((r) => r.id === resume.id);
    let newSavedResumes: Resume[];

    if (existingIndex >= 0) {
      newSavedResumes = [...savedResumes];
      newSavedResumes[existingIndex] = updatedResume;
    } else {
      newSavedResumes = [...savedResumes, updatedResume];
    }

    setSavedResumes(newSavedResumes);
    localStorage.setItem("savedResumes", JSON.stringify(newSavedResumes));
    
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const loadResume = (id: string) => {
    const foundResume = savedResumes.find((r) => r.id === id);
    if (foundResume) {
      setResume(foundResume);
      setActiveSection("template");
      
      toast({
        title: "Resume loaded",
        description: "Your resume has been loaded successfully.",
      });
    }
  };

  const deleteResume = (id: string) => {
    const newSavedResumes = savedResumes.filter((r) => r.id !== id);
    setSavedResumes(newSavedResumes);
    localStorage.setItem("savedResumes", JSON.stringify(newSavedResumes));
    
    toast({
      title: "Resume deleted",
      description: "Your resume has been deleted successfully.",
    });
  };

  const createNewResume = () => {
    setResume({ ...defaultResume, id: crypto.randomUUID() });
    setActiveSection("template");
    
    toast({
      title: "New resume created",
      description: "Start building your new resume.",
    });
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
      
      // Add a temporary class for PDF generation
      document.body.classList.add('generating-pdf');
      
      // Improved canvas rendering options
      const canvas = await html2canvas(resumeElement as HTMLElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          // Fix the layout in the cloned document
          const clonedResume = clonedDoc.querySelector('.resume-page');
          if (clonedResume) {
            clonedResume.classList.add('pdf-export');
            
            // Ensure proper styling for print
            const style = clonedDoc.createElement('style');
            style.innerHTML = `
              .resume-page.pdf-export {
                transform: scale(1) !important;
                position: relative !important;
                overflow: visible !important;
                width: 8.5in !important;
                min-height: 11in !important;
                page-break-after: always !important;
              }
              
              .resume-page.pdf-export [class*="absolute"] {
                position: absolute !important;
              }
              
              .resume-page.pdf-export .ml-1\\/3 {
                margin-left: 33.333% !important;
              }
              
              .resume-page.pdf-export p, 
              .resume-page.pdf-export div {
                overflow: visible !important;
                word-wrap: break-word !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        }
      });
      
      // Remove temporary class
      document.body.classList.remove('generating-pdf');
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
