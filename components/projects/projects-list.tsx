"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectStatus, Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

// Temporary mock data
const projects: Project[] = [
  {
    id: "1",
    name: "Construction Immeuble A",
    description: "Construction d'un immeuble de 10 étages",
    status: "IN_PROGRESS",
    priority: "HIGH",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    budget: 2500000,
    clientId: "client1",
    managerId: "manager1",
    progress: 35,
    location: "Paris",
    documents: [],
    partners: [],
  },
  // Add more mock projects as needed
];

const statusColors: Record<ProjectStatus, string> = {
  PLANNED: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  ON_HOLD: "bg-orange-100 text-orange-800",
  COMPLETED: "bg-green-100 text-green-800",
};

const statusLabels: Record<ProjectStatus, string> = {
  PLANNED: "Planifié",
  IN_PROGRESS: "En cours",
  ON_HOLD: "En pause",
  COMPLETED: "Terminé",
};

export default function ProjectsList() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du projet</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Progression</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead className="text-right">Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={statusColors[project.status]}>
                  {statusLabels[project.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {project.progress}%
                </span>
              </TableCell>
              <TableCell>{formatDate(project.startDate)}</TableCell>
              <TableCell>{formatDate(project.endDate)}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(project.budget)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}