"use client";

import { Document } from "@/types/document";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, MoreHorizontal, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { formatFileSize, formatDate } from "@/lib/utils";

interface DocumentsListProps {
  documents: Document[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function DocumentsList({
  documents,
  isLoading,
  onRefresh,
}: DocumentsListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) return;

    try {
      await api.deleteDocument(id);
      toast.success("Document supprimé avec succès");
      onRefresh();
    } catch (error) {
      toast.error("Erreur lors de la suppression du document");
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Taille</TableHead>
            <TableHead>Ajouté le</TableHead>
            <TableHead>Ajouté par</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="font-medium">{document.name}</TableCell>
              <TableCell>{document.type}</TableCell>
              <TableCell>{formatFileSize(document.size)}</TableCell>
              <TableCell>{formatDate(document.uploadedAt)}</TableCell>
              <TableCell>{document.uploadedBy}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(document.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}