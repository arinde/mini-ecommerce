import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Checkout - Mini-Commerce',
  description: 'Complete your purchase at the Mini-Commerce App.',
};

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

export default function CheckoutLayout({ children }: CartLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}