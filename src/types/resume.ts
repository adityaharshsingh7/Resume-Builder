
export interface ResumePersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  title: string;
  summary: string;
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  isCurrentJob: boolean;
}

export interface ResumeSkill {
  id: string;
  name: string;
  level: number;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  thumbnail: string;
  component: string;
}

export interface Resume {
  id: string;
  title: string;
  lastUpdated: string;
  templateId: string;
  personalInfo: ResumePersonalInfo;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  skills: ResumeSkill[];
}

export type ResumeSection = 'personalInfo' | 'education' | 'experience' | 'skills' | 'template';
