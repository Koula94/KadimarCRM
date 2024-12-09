"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProjectsHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Projets</h2>
        <p className="text-muted-foreground">
          Gérez tous vos projets de construction et suivez leur progression
        </p>
      </div>
      <Button onClick={() => router.push("/projects/new")}>
        <Plus className="mr-2 h-4 w-4" />
        Nouveau Projet
      </Button>
    </div>
  );
}