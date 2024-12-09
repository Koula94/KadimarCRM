import { Partner } from "@/types/partner";
import { Project } from "@/types/project";

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  console.warn('NEXT_PUBLIC_API_URL is not defined. Using default URL: http://localhost:8080/api');
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const baseUrl = API_URL || 'http://localhost:8080/api';
  const response = await fetch(`${baseUrl}${url}`, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData
    });
    throw new Error(`API Error: ${errorData?.error || response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Projects
  getProjects: () => fetchWithAuth('/projects'),
  getProject: (id: string) => fetchWithAuth(`/projects/${id}`),
  createProject: (project: Partial<Project>) => 
    fetchWithAuth('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    }),
  updateProject: (id: string, project: Partial<Project>) =>
    fetchWithAuth(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    }),
  deleteProject: (id: string) =>
    fetchWithAuth(`/projects/${id}`, { method: 'DELETE' }),

  // Partners
  getPartners: () => fetchWithAuth('/partners'),
  getPartner: (id: string) => fetchWithAuth(`/partners/${id}`),
  createPartner: (partner: Partial<Partner>) =>
    fetchWithAuth('/partners', {
      method: 'POST',
      body: JSON.stringify(partner),
    }),
  updatePartner: (id: string, partner: Partial<Partner>) =>
    fetchWithAuth(`/partners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(partner),
    }),
  deletePartner: (id: string) =>
    fetchWithAuth(`/partners/${id}`, { method: 'DELETE' }),

  // Documents
  uploadDocument: (file: File, projectId: string, userId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);
    formData.append('userId', userId);

    return fetchWithAuth('/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  },
  getProjectDocuments: (projectId: string) =>
    fetchWithAuth(`/documents/project/${projectId}`),
  deleteDocument: (id: string) =>
    fetchWithAuth(`/documents/${id}`, { method: 'DELETE' }),
};