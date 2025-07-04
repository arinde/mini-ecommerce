import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

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
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    );
}