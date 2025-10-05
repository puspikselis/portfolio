import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
