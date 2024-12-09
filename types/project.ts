export type ProjectStatus = 'PLANNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED';
export type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  endDate: string;
  budget: number;
  clientId: string;
  managerId: string;
  progress: number;
  location: string;
  documents: string[];
  partners: string[];
}

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string[];
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  dueDate: string;
  priority: ProjectPriority;
}