
import { Resume } from '@/types/resume';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Helper function to convert database row to Resume type
const mapDbRowToResume = (row: any): Resume => {
  return {
    id: row.id,
    title: row.title,
    lastUpdated: row.lastupdated,
    templateId: row.templateid,
    personalInfo: row.personalinfo,
    education: row.education,
    experience: row.experience,
    skills: row.skills
  };
};

// Helper function to convert Resume type to database row format
const mapResumeToDbRow = (resume: Resume): any => {
  return {
    id: resume.id,
    title: resume.title,
    lastupdated: resume.lastUpdated,
    templateid: resume.templateId,
    personalinfo: resume.personalInfo,
    education: resume.education,
    experience: resume.experience,
    skills: resume.skills,
    user_id: resume.user_id || undefined
  };
};

export const resumeService = {
  async getAll(): Promise<Resume[]> {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*');
      
      if (error) throw error;
      return data ? data.map(row => mapDbRowToResume(row)) : [];
    } catch (error) {
      console.error('Error fetching resumes:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Resume | null> {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data ? mapDbRowToResume(data) : null;
    } catch (error) {
      console.error('Error fetching resume by ID:', error);
      return null;
    }
  },

  async create(resume: Resume): Promise<Resume | null> {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Prepare resume data for database
      const dbResume = mapResumeToDbRow(resume);
      
      // Set user_id if not already set
      if (!dbResume.user_id && user) {
        dbResume.user_id = user.id;
      }
      
      const { data, error } = await supabase
        .from('resumes')
        .insert(dbResume)
        .select()
        .single();
      
      if (error) throw error;
      return data ? mapDbRowToResume(data) : null;
    } catch (error) {
      console.error('Error creating resume:', error);
      return null;
    }
  },

  async update(id: string, resume: Resume): Promise<Resume | null> {
    try {
      // Prepare resume data for database
      const dbResume = mapResumeToDbRow(resume);
      
      const { data, error } = await supabase
        .from('resumes')
        .update(dbResume)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data ? mapDbRowToResume(data) : null;
    } catch (error) {
      console.error('Error updating resume:', error);
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting resume:', error);
      return false;
    }
  }
};
