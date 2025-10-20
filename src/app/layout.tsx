import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import { CursorPreviewProvider } from '@/components/features/cursor-preview';
import { GridOverlay } from '@/components/features/grid-overlay';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ToastProvider } from '@/components/ui/toast';

import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  description:
    "Designer turning ideas into products people actually enjoy using. I've built my own businesses and helped clients worldwide create complete digital experiences that look great and work even better.",
  icons: {
    apple: '/favicon/apple-icon.png',
    icon: '/favicon/icon.png',
  },
  title: 'Kristaps Krūze - Designer',
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1BYJXYBJPS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1BYJXYBJPS');
          `}
        </Script>

        <ToastProvider>
          <CursorPreviewProvider>
            <GridOverlay />
            <div className="relative mx-auto max-w-404 border-nero-500 border-r border-l">
              <Header />
              {children}
              <Footer />
            </div>
          </CursorPreviewProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
