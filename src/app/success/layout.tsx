import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Order Confirmation - Mini-Commerce',
  description: 'Your order has been successfully placed. Thank you for your purchase!',
};

interface SuccessLayoutProps {
  children: React.ReactNode;
}

export default function SuccessLayout({ children }: SuccessLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}