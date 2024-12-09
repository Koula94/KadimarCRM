"use client";

import { useEffect, useState } from "react";
import { Partner } from "@/types/partner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PartnersList } from "@/components/partners/partners-list";
import { CreatePartnerDialog } from "@/components/partners/create-partner-dialog";
import { toast } from "sonner";

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await api.getPartners();
      setPartners(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des partenaires");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePartner = async (partner: Partial<Partner>) => {
    try {
      await api.createPartner(partner);
      toast.success("Partenaire créé avec succès");
      loadPartners();
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la création du partenaire");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Partenaires</h2>
          <p className="text-muted-foreground">
            Gérez vos partenaires et sous-traitants
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Partenaire
        </Button>
      </div>

      <PartnersList 
        partners={partners} 
        isLoading={isLoading} 
        onRefresh={loadPartners} 
      />

      <CreatePartnerDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreatePartner}
      />
    </div>
  );
}