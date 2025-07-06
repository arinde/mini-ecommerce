'use client';

import Link from 'next/link';
import { useCartStore } from '../lib/cartStore';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          Mini-Commerce
        </Link>
        <div>
          <Link href="/cart" className="relative text-lg hover:text-gray-300 transition-colors">
            Cart ({totalItems})
          </Link>
        </div>
      </nav>
    </header>
  );
}