import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: '2026 (언)수다(혜) 설특집 경주 패밀리 아케이드',
  description: '[초특급 예능] 천년고도 경주에서 펼쳐지는 6인 가족의 리얼 아케이드!',
  openGraph: {
    title: '2026 (언)수다(혜) 설특집 경주 패밀리 아케이드',
    description: '[초특급 예능] 천년고도 경주에서 펼쳐지는 6인 가족의 리얼 아케이드!',
    images: ['/opengraph-image.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Jua&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
