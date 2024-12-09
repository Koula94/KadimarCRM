import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/auth-context';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: 'KADIMAR S.A. - Gestion BTP',
  description: 'Logiciel de gestion pour KADIMAR S.A.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto bg-background">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}