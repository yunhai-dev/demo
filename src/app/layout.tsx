import type { Metadata } from 'next';
import './globals.css';
import { SelectionProvider } from '@/context/SelectionContext';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '航空工业办公平台', // 遵循 航空工业 + 系统名 规范
  description: '专业、规范的智能管理系统',
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
        {/* 使用 Inter 作为 Web 优化字体，视觉上接近规范要求的思源黑体 */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased overflow-hidden text-[14px] leading-[22px]">
        <SelectionProvider>
          {children}
          <Toaster />
        </SelectionProvider>
      </body>
    </html>
  );
}
