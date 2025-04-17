
import { createClient } from '@supabase/supabase-js';
import { Resume } from '@/types/resume';

// These will be replaced with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const resumeService = {
  async getAll(): Promise<Resume[]> {
    const { data, error } = await supabase
      .from('resumes')
      .select('*');
    
    if (error) throw error;
    return data as Resume[];
  },

  async getById(id: string): Promise<Resume> {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Resume;
  },

  async create(resume: Resume): Promise<Resume> {
    const { data, error } = await supabase
      .from('resumes')
      .insert(resume)
      .select()
      .single();
    
    if (error) throw error;
    return data as Resume;
  },

  async update(id: string, resume: Resume): Promise<Resume> {
    const { data, error } = await supabase
      .from('resumes')
      .update(resume)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Resume;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
