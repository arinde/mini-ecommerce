'use client';
export const dynamic = 'force-dynamic'; 

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="bg-white border rounded-lg p-8 shadow-md">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Order Placed Successfully!</h1>
      <p className="text-xl text-gray-800 mb-6">Thank you for your purchase.</p>
      {orderId && (
        <p className="text-lg text-gray-700 mb-8">
          Your Order ID is: <span className="font-semibold text-blue-600">{orderId}</span>
        </p>
      )}
      {!orderId && (
          <p className="text-lg text-gray-700 mb-8">
              Your order has been processed.
          </p>
      )}
      <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out">
        Continue Shopping
      </Link>
    </div>
  );
}


export default function SuccessPage() {
  return (
    <main className="container mx-auto p-4 md:p-8 max-w-xl text-center flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
      <Suspense fallback={<div>Loading order details...</div>}> 
        <SuccessPageContent />
      </Suspense>
    </main>
  );
}