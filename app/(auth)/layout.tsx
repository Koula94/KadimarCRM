"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-primary/40" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="/logo.png" alt="KADIMAR S.A." className="h-8 w-auto mr-2" />
            KADIMAR S.A.
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Ensemble, construisons l'avenir avec excellence et innovation."
              </p>
              <footer className="text-sm">KADIMAR S.A.</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
