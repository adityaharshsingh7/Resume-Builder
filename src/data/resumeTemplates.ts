
import { ResumeTemplate } from "../types/resume";

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "simple",
    name: "Simple",
    thumbnail: "/placeholder.svg",
    component: "SimpleTemplate"
  },
  {
    id: "professional",
    name: "Professional",
    thumbnail: "/placeholder.svg",
    component: "ProfessionalTemplate"
  },
  {
    id: "modern",
    name: "Modern",
    thumbnail: "/placeholder.svg",
    component: "ModernTemplate"
  },
  {
    id: "creative",
    name: "Creative",
    thumbnail: "/placeholder.svg",
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
