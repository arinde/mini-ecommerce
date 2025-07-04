import ProductsData from "@/data/Products.json"

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const LOCAL_STORAGE_PRODUCTS_KEY = 'mini_commerce_products';

function seedProductsToLocalStorage () : void {
    if (typeof window !== 'undefined' && !localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY)) {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(ProductsData));
      console.log('Products seeded to localStorage.');
    } catch (error) {
      console.error('Error seeding products to localStorage:', error);
    }
  }
}

export async function fetchProducts(): Promise<Product[]> {
  if (typeof window !== 'undefined') {
    seedProductsToLocalStorage();
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts) as Product[];
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ProductsData as Product[]);
    }, 300);
  });
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  const products = await fetchProducts();
  return products.find(product => product.id === id);
}