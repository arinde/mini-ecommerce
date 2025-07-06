'use client';

import Link from 'next/link';
import { useCartStore } from '../lib/cartStore';
import { ShoppingCart } from '@phosphor-icons/react';
import Image from 'next/image';
import GreetingsDisplay from './GreetingsDisplay';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="bg-gray-800 text-white z-50 fixed w-full shadow-md">
      <div className="mx-8 md:mx-14  flex justify-between h-20 items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          <Image src='/Images/Logo.png' width={60} height={60} alt='NexusMart' />
        </Link>
        <div  className='flex gap-x-3 items-center'>
          <GreetingsDisplay />
          <Link href="/cart" className="relative text-lg flex hover:text-gray-300 transition-colors">
           <div className='relative'>
            <ShoppingCart size={28} /> 
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}