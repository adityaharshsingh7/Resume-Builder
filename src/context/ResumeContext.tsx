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
      
      // Add a temporary class for PDF generation
      document.body.classList.add('generating-pdf');
      
      // Improved canvas rendering options
      const canvas = await html2canvas(resumeElement as HTMLElement, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
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
              
              .resume-page.pdf-export * {
                font-family: Arial, Helvetica, sans-serif !important;
                letter-spacing: normal !important;
                word-spacing: normal !important;
                line-height: 1.3 !important;
                text-rendering: geometricPrecision !important;
              }
              
              .resume-page.pdf-export [class*="absolute"] {
                position: absolute !important;
              }
              
              .resume-page.pdf-export .ml-1\\/3 {
                margin-left: 33.333% !important;
              }
              
              .resume-page.pdf-export p, 
              .resume-page.pdf-export div,
              .resume-page.pdf-export span,
              .resume-page.pdf-export h1,
              .resume-page.pdf-export h2,
              .resume-page.pdf-export h3 {
                overflow: visible !important;
                word-wrap: break-word !important;
                max-width: 100% !important;
                white-space: normal !important;
              }
              
              .resume-page.pdf-export .flex {
                display: flex !important;
              }
              
              .resume-page.pdf-export .justify-between {
                justify-content: space-between !important;
              }
              
              .resume-page.pdf-export .grid {
                display: grid !important;
              }
              
              .resume-page.pdf-export .grid-cols-12 {
                grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
              }
              
              .resume-page.pdf-export .col-span-4 {
                grid-column: span 4 / span 4 !important;
              }
              
              .resume-page.pdf-export .col-span-8 {
                grid-column: span 8 / span 8 !important;
              }
              
              .resume-page.pdf-export .w-1\\/3 {
                width: 33.333% !important;
              }
              
              .resume-page.pdf-export .w-2\\/3 {
                width: 66.666% !important;
              }
              
              .resume-page.pdf-export .space-y-3 > * + *,
              .resume-page.pdf-export .space-y-4 > * + * {
                margin-top: 0.75rem !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        }
      });
      
      // Remove temporary class
      document.body.classList.remove('generating-pdf');
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });
      
      // Add image at exact size to ensure proper rendering
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height, '', 'FAST');
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
