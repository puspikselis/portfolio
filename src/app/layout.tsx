import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { GridOverlay } from '@/components/grid-overlay';
import { Header } from '@/components/header';

import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  description: 'Designer',
  title: 'Kristaps Krūze',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ '--default-font-family': inter.style.fontFamily } as React.CSSProperties}
    >
      <body className="relative">
        <GridOverlay />
        <div className="relative mx-auto max-w-404 border-nero-500 border-r border-l">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
