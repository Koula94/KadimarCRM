"use client";

import { Partner, PartnerType } from "@/types/partner";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const partnerTypeLabels: Record<PartnerType, string> = {
  SUBCONTRACTOR: "Sous-traitant",
  SUPPLIER: "Fournisseur",
  CONSULTANT: "Consultant",
  OTHER: "Autre",
};

interface PartnersListProps {
  partners: Partner[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function PartnersList({ partners, isLoading, onRefresh }: PartnersListProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) return;

    try {
      await api.deletePartner(id);
      toast.success("Partenaire supprimé avec succès");
      onRefresh();
    } catch (error) {
      toast.error("Erreur lors de la suppression du partenaire");
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
            <TableHead>SIRET</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell className="font-medium">{partner.name}</TableCell>
              <TableCell>{partner.siret}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {partnerTypeLabels[partner.type]}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">{partner.email}</div>
                  <div className="text-sm text-muted-foreground">
                    {partner.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(partner.id)}
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