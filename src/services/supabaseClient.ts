
import { createClient } from '@supabase/supabase-js';
import { Resume } from '@/types/resume';

// Check for environment variables and provide fallbacks for development
// NOTE: In production, these need to be set as actual environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log connection status to help with debugging
console.log('Supabase client initialized with URL:', supabaseUrl);

// Database schema:
// - auth.users: Built-in Supabase auth users table
// - public.resumes: Custom table for storing resumes
//   - id: uuid (primary key)
//   - user_id: uuid (foreign key to auth.users.id)
//   - title: text
//   - lastUpdated: timestamp
//   - templateId: text
//   - personalInfo: jsonb
//   - education: jsonb[]
//   - experience: jsonb[]
//   - skills: jsonb[]

export const resumeService = {
  async getAll(): Promise<Resume[]> {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user logged in, returning empty resume list');
        return [];
      }
      
      // Only get resumes for the logged-in user
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as Resume[] || [];
    } catch (error) {
      console.error('Error fetching resumes:', error);
      // Return empty array to avoid UI errors
      return [];
    }
  },

  async getById(id: string): Promise<Resume | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user logged in, cannot fetch resume');
        return null;
      }
      
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id) // Ensure the resume belongs to the current user
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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user logged in, cannot create resume');
        return null;
      }
      
      // Add user_id to the resume
      const resumeWithUserId = {
        ...resume,
        user_id: user.id
      };
      
      const { data, error } = await supabase
        .from('resumes')
        .insert(resumeWithUserId)
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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user logged in, cannot update resume');
        return null;
      }
      
      const { data, error } = await supabase
        .from('resumes')
        .update({
          ...resume,
          user_id: user.id // Ensure the user_id stays the same
        })
        .eq('id', id)
        .eq('user_id', user.id) // Ensure the resume belongs to the current user
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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user logged in, cannot delete resume');
        return false;
      }
      
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Ensure the resume belongs to the current user
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting resume:', error);
      return false;
    }
  }
};

// Authentication service
export const authService = {
  // Register a new user
  async signUp(email: string, password: string): Promise<{ success: boolean, error: any }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { success: false, error };
    }
  },
  
  // Sign in an existing user
  async signIn(email: string, password: string): Promise<{ success: boolean, error: any }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { success: false, error };
    }
  },
  
  // Sign out the current user
  async signOut(): Promise<boolean> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      return false;
    }
  },
  
  // Get the current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
  
  // Check if a user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
};
