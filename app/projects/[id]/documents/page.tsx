"use client";

import { useEffect, useState } from "react";
import { Document } from "@/types/document";
import { api } from "@/lib/api";
import { DocumentsList } from "@/components/documents/documents-list";
import { DocumentUploadDialog } from "@/components/documents/document-upload-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function ProjectDocumentsPage({
  params,
}: {
  params: { id: string };
}) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, [params.id]);

  const loadDocuments = async () => {
    try {
      const data = await api.getProjectDocuments(params.id);
      setDocuments(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des documents");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (file: File, description?: string) => {
    try {
      await api.uploadDocument(file, params.id, "current-user-id"); // TODO: Get from auth context
      toast.success("Document téléchargé avec succès");
      loadDocuments();
      setIsUploadDialogOpen(false);
    } catch (error) {
      toast.error("Erreur lors du téléchargement du document");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents du projet</h2>
          <p className="text-muted-foreground">
            Gérez les documents, plans et rapports du projet
          </p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Document
        </Button>
      </div>

      <DocumentsList
        documents={documents}
        isLoading={isLoading}
        onRefresh={loadDocuments}
      />

      <DocumentUploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUpload={handleUpload}
      />
    </div>
  );
}