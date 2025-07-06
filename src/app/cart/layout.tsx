// src/app/cart/layout.tsx
// This is a Server Component by default, no 'use client' needed.

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Your Shopping Cart - Mini-Commerce',
  description: 'Review your selected items before proceeding to checkout.',

};

interface CartLayoutProps {
  children: React.ReactNode;
}

export default function CartLayout({ children }: CartLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}