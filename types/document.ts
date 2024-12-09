export interface Document {
  id: string;
  name: string;
  type: string;
  description?: string;
  uploadedAt: string;
  uploadedBy: string;
  projectId: string;
  size: number;
  contentType: string;
}

export interface DocumentUpload {
  file: File;
  projectId: string;
  description?: string;
}