'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../../lib/cartStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-xl text-center pt-28">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty!</h1>
        <p className="text-lg text-gray-600 mb-6">Please add some items before checking out.</p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    clearCart();
    toast.success('order placed successfully')
    const orderId = `MC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    router.push(`/success?orderId=${orderId}`);
  };

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center pt-28">Order Summary</h1>

      <div className="bg-white border rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-3">Items in Your Order</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-lg">
              <div className="flex items-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="w-16 h-16 object-cover rounded-md mr-3"
                />
                <span>{item.name} (x{item.quantity})</span>
              </div>
              <span className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center text-xl font-semibold mb-4">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Link href="/cart" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg text-center transition duration-300 ease-in-out w-full sm:w-auto">
          &larr; Back to Cart
        </Link>
        <button
          onClick={handlePlaceOrder}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out w-full sm:w-auto"
        >
          Place Order
        </button>
      </div>
    </main>
  );
}