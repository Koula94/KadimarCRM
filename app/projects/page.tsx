import { Metadata } from "next";
import ProjectsList from "@/components/projects/projects-list";
import { ProjectsHeader } from "@/components/projects/projects-header";

export const metadata: Metadata = {
  title: "Projets | KADIMAR S.A.",
  description: "Gestion des projets KADIMAR S.A.",
};

export default function ProjectsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProjectsHeader />
      <ProjectsList />
    </div>
  );
}