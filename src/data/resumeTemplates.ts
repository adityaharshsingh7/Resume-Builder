
import { ResumeTemplate } from "../types/resume";

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "simple",
    name: "Simple",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    component: "SimpleTemplate"
  },
  {
    id: "professional",
    name: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    component: "ProfessionalTemplate"
  },
  {
    id: "modern",
    name: "Modern",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    component: "ModernTemplate"
  },
  {
    id: "creative",
    name: "Creative",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    component: "CreativeTemplate"
  }
];

export const defaultResume = {
  id: "",
  title: "Untitled Resume",
  lastUpdated: new Date().toISOString(),
  templateId: "simple",
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    title: "",
    summary: ""
  },
  education: [],
  experience: [],
  skills: []
};
