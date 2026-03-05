import type { Metadata } from 'next';
import './globals.css';
import { SelectionProvider } from '@/context/SelectionContext';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '领航智库 AI - 航空制造智能知识管理系统',
  description: '专业、智能的航空制造科研与工程知识库',
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
      <body className="font-body antialiased overflow-hidden">
        <SelectionProvider>
          {children}
          <Toaster />
        </SelectionProvider>
      </body>
    </html>
  );
}
