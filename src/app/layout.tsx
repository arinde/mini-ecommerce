import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Header from '../components/Header'
import ErrorBoundary from '../components/ErrorBoundary'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mini-Commerce App',
  description: 'A front-end technical assessment for a mini e-commerce shop.',
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <ErrorBoundary>
            <Providers>
              <Header />
              {children}
              <Toaster />
            </Providers>
          </ErrorBoundary>
        </body>
      </html>
    );
}