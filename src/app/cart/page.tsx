'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../../lib/cartStore';
import toast from 'react-hot-toast';


export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalItems = useCartStore((state) => state.getTotalItems());
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleQuantityChange = (productId: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    updateQuantity(productId, newQuantity);
    toast.success(`Quantity updated to ${newQuantity}`);
  };
  const handleRemoveFromCart = (itemId: string) => {
      removeFromCart(itemId);
      toast.success('Item removed from cart');
  };

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center pt-28">Your Shopping Cart ({totalItems} items)</h1>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex items-center border rounded-lg p-4 shadow-sm bg-white">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex md:flex-row flex-col gap-y-3 md:items-center">
                  <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity for {item.name}</label>
                  <select
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className="border rounded-md p-2 w-20 text-center md:mr-4"
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 md:px-3 px-0 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between items-center text-xl font-semibold mb-4">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-2xl font-bold mb-6">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out w-full sm:w-auto"
              >
                Clear Cart
              </button>
              <Link href="/checkout" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg text-center transition duration-300 ease-in-out w-full sm:w-auto">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}