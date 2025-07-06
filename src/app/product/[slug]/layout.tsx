
import type { Metadata } from 'next';
import { fetchProductById } from '../../../lib/productService';

interface ProductLayoutProps {
  params: {
    slug: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: ProductLayoutProps): Promise<Metadata> {
  const productId = params.slug;
  const product = await fetchProductById(productId);

  if (!product) {
    return {
      title: 'Product Not Found - Mini-Commerce',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: `${product.name} - Mini-Commerce`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Mini-Commerce`,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Mini-Commerce`,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default function ProductDetailLayout({ children }: ProductLayoutProps) {
  return (
    <>
      {children} 
    </>
  );
}