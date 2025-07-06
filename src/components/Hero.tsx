'use client'
import { motion } from 'framer-motion';
import Link from 'next/link'

export default function Hero () {
    const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.1, 
        staggerChildren: 0.1, 
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 15,
      },
    },
  };

    return(
        <section
        className="relative py-28 md:py-32 px-4 mb-10 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/Images/cartImage.png')",
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto text-center relative z-10">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold gap-x-2 leading-tight mb-4 text-white animate-fade-in-up">
            Welcome to  <span className="text-yellow-300">NexusMart</span> 
            
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto text-gray-100 animate-fade-in-up delay-200">
            Discover quality products and shop smarter for every lifestyle.
          </motion.p>
          <Link href="#products-list"
            className="inline-block bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105 animate-fade-in-up delay-400"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>
    )
}
