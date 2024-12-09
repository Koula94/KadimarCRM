"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Building2,
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  Handshake,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Projets",
    icon: Building2,
    href: "/projects",
  },
  {
    label: "Ressources Humaines",
    icon: Users,
    href: "/hr",
  },
  {
    label: "Clients",
    icon: Briefcase,
    href: "/clients",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    label: "Partenaires",
    icon: Handshake,
    href: "/partners",
  },
  {
    label: "Finance",
    icon: CreditCard,
    href: "/finance",
  },
  {
    label: "Rapports",
    icon: BarChart3,
    href: "/reports",
  },
  {
    label: "Paramètres",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full w-64 bg-secondary/10 border-r">
      <div className="px-3 py-2">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary mb-4 text-center">
            KADIMAR S.A.
          </h1>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start mb-1",
              pathname === route.href && "bg-secondary"
            )}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-5 w-5" />
              {route.label}
            </Link>
          </Button>
        ))}
      </ScrollArea>
    </div>
  );
}