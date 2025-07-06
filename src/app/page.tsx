'use client'
import { useQuery } from "@tanstack/react-query"
import { fetchProducts, Product } from "@/lib/productService"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/lib/cartStore"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import Hero from "@/components/Hero"

export default function Home () {
  const {data: products, isLoading, isError, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  const productGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const productCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as "spring",
        stiffness: 120, 
      },
    },
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product) => {
    if (product) {
      try {
        addToCart(product);
        toast.success('Successfully Added to Cart!');
        console.log(`${product.name} added to cart!`);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        toast.error('Could not add item to cart. Please try again.');
      }
    }
  }

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
    <>
    <Hero />
    <main id="products-list" className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Product Catalogue</h1>
      <motion.div 
        variants={productGridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div key={product.id} 
            variants={productCardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center text-center">
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
            <div className="flex items-center justify-between space-x-3">
              <Link href={`/product/${product.id}`} className=" bg-blue-500 text-md hover:bg-blue-600 text-white font-medium w-28 py-2 rounded-lg">
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-600 hover:bg-green-700 text-white w-28 py-2 font-medium rounded-lg text-md transition duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
    </>
  );
}