import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopNav } from '@/components/layout/TopNav';
import { SelectionProvider } from '@/context/SelectionContext';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'EduWisdom AI - 中国教育科学研究院 AI 知识库系统',
  description: '专业、智能的教育科研知识库系统',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body">
        <SelectionProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset className="flex flex-col flex-1 min-w-0 bg-background overflow-hidden">
                <TopNav />
                <main className="flex-1 overflow-auto">
                  {children}
                </main>
              </SidebarInset>
            </div>
            <Toaster />
          </SidebarProvider>
        </SelectionProvider>
      </body>
    </html>
  );
}