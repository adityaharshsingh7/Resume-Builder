
import { Resume } from '@/types/resume';
import { supabase } from '@/integrations/supabase/client';

export const resumeService = {
  async getAll(): Promise<Resume[]> {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*');
      
      if (error) throw error;
      return data as Resume[] || [];
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
      return data as Resume;
    } catch (error) {
      console.error('Error fetching resume by ID:', error);
      return null;
    }
  },

  async create(resume: Resume): Promise<Resume | null> {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert(resume)
        .select()
        .single();
      
      if (error) throw error;
      return data as Resume;
    } catch (error) {
      console.error('Error creating resume:', error);
      return null;
    }
  },

  async update(id: string, resume: Resume): Promise<Resume | null> {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .update(resume)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Resume;
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
