'use client'
import { useQuery } from "@tanstack/react-query"
import { fetchProducts, Product } from "@/lib/productService"
import Image from "next/image"
import Link from "next/link"

export default function Home () {
  const {data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading){
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <p className="text-xl font-bold">Error loading products:</p>
        <p className="text-sm">{error?.message || 'Unknown error'}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        <p className="text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Product Catalogue</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4 flex flex-col items-center text-center">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
            <Link href={`/product/${product.id}`} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}