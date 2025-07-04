'use client'

import { useQuery } from '@tanstack/react-query';
import { fetchProductById, Product} from '../../../lib/productService'
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailPageProps {
    params: {
        slug: string;
    }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const productId = params.slug;
    
    const { data: product, isLoading, isError, error } = useQuery<Product | undefined, Error>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId), 
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <p className="text-xl font-bold">Error loading product:</p>
        <p className="text-sm">{error?.message || 'Unknown error'}</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 block">
          Go back to Catalogue
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        <p className="text-lg">Product not found.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 block">
          Go back to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-6 max-w-4xl">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Catalogue
      </Link>
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="flex-shrink-0 md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto object-contain rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-extrabold mb-3 text-gray-900">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-700 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

          {/* Placeholder for Add to Cart button */}
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}