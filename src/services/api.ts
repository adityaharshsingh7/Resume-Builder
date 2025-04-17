
import axios from 'axios';
import { Resume } from '../types/resume';

const API_URL = 'http://localhost:5000/api';

export const resumeApi = {
  getAll: async (): Promise<Resume[]> => {
    try {
      const response = await axios.get(`${API_URL}/resumes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resumes:', error);
      throw error;
    }
  },
  
  getById: async (id: string): Promise<Resume> => {
    try {
      const response = await axios.get(`${API_URL}/resumes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching resume with id ${id}:`, error);
      throw error;
    }
  },
  
  create: async (resume: Resume): Promise<Resume> => {
    try {
      const response = await axios.post(`${API_URL}/resumes`, resume);
      return response.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  },
  
  update: async (id: string, resume: Resume): Promise<Resume> => {
    try {
      const response = await axios.put(`${API_URL}/resumes/${id}`, resume);
      return response.data;
    } catch (error) {
      console.error(`Error updating resume with id ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/resumes/${id}`);
    } catch (error) {
      console.error(`Error deleting resume with id ${id}:`, error);
      throw error;
    }
  }
};
