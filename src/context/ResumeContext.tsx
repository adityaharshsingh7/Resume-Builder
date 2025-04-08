
import React, { createContext, useContext, useState, useEffect } from "react";
import { Resume, ResumeSection } from "../types/resume";
import { defaultResume } from "../data/resumeTemplates";
import { useToast } from "@/components/ui/use-toast";

interface ResumeContextType {
  resume: Resume;
  activeSection: ResumeSection;
  setActiveSection: (section: ResumeSection) => void;
  updateResume: <K extends keyof Resume>(key: K, value: Resume[K]) => void;
  savedResumes: Resume[];
  saveResume: () => void;
  loadResume: (id: string) => void;
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

  const createNewResume = () => {
    setResume({ ...defaultResume, id: crypto.randomUUID() });
    setActiveSection("template");
    
    toast({
      title: "New resume created",
      description: "Start building your new resume.",
    });
  };

  const downloadResume = () => {
    // Handle print to PDF functionality
    window.print();
    
    toast({
      title: "Downloading resume",
      description: "Your resume is being prepared for download.",
    });
  };

  const value = {
    resume,
    activeSection,
    setActiveSection,
    updateResume,
    savedResumes,
    saveResume,
    loadResume,
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
