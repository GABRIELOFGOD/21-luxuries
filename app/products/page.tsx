"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, Product } from "../lib/store";

// Loading component
function ProductSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="animate-pulse"
    >
      <div className="bg-gray-300 h-64 w-full rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
    </motion.div>
  );
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer hover:scale-105 transition-transform"
      onClick={handleAddToCart}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={400}
        className="w-full h-auto"
      />
    </motion.div>
  );
}

// Product Grid Component with streaming
function ProductGrid({
  category,
  type,
  limit = 30,
}: {
  category: "men" | "women";
  type: string;
  limit?: number;
}) {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchProducts = async (currentOffset: number, reset = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/products?category=${category}&type=${type}&limit=${limit}&offset=${currentOffset}`,
      );
      const data = await response.json();

      if (reset) {
        setVisibleProducts(data);
      } else {
        setVisibleProducts((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === limit);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(0, true);
    setOffset(0);
  }, [category, type, limit]);

  const loadMore = () => {
    if (isLoading || !hasMore) return;

    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchProducts(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mx-5 md:mx-10">
        <AnimatePresence>
          {visibleProducts.map((product, index) => (
            <Suspense key={product.id} fallback={<ProductSkeleton />}>
              <ProductCard product={product} />
            </Suspense>
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-6 py-3 bg-[#f84258] text-white rounded-lg hover:bg-[#e63946] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="pt-20">
      <h2 className="text-center text-black text-xl md:text-2xl font-bold break-words px-4">
        Everyone Has A Style Statement
        <br />
        <span className="text-[#f84258] text-2xl md:text-3xl">
          FIND YOURS HERE!
        </span>
      </h2>

      <br />

      <div className="text-center bg-gray-100 py-8">
        <Image
          src="/work/Merlin-Fashion-master/images/products-img/marcus-loke-xXJ6utyoSw0-unsplash (1).jpg"
          alt="Products banner"
          width={800}
          height={400}
          className="mx-auto max-w-full"
        />
      </div>

      <div className="text-center py-8">
        <p className="text-black text-lg">
          <span className="text-[#f84258]">Click</span> on the product to add in
          your shopping list.
          <br />
          Go below and check <span className="text-[#f84258]">
            YOUR CART
          </span>{" "}
          for details.
        </p>
      </div>

      {/* Women's Products */}
      <h1 className="text-center text-black text-xl md:text-2xl font-bold my-8">
        For <span className="text-[#f84258]">Her</span>
      </h1>
      <hr className="border-black w-full max-w-xs mx-auto" />
      <br />
      <br />

      <h3 className="text-center text-black font-semibold mb-4">Kurtis</h3>
      <ProductGrid category="women" type="kurti" limit={8} />

      <h3 className="text-center text-black font-semibold my-8">
        Western Wear
      </h3>
      <ProductGrid category="women" type="western" limit={8} />

      <h3 className="text-center text-black font-semibold my-8">
        Sports Shoes
      </h3>
      <ProductGrid category="women" type="g-shoe" limit={8} />

      <h3 className="text-center text-black font-semibold my-8">Heels</h3>
      <ProductGrid category="women" type="heel" limit={8} />

      {/* Men's Products */}
      <h1 className="text-center text-black text-xl md:text-2xl font-bold my-16">
        For <span className="text-[#f84258]">Him</span>
      </h1>
      <hr className="border-black w-full max-w-xs mx-auto" />
      <br />
      <br />

      <h3 className="text-center text-black font-semibold mb-4">Shirts</h3>
      <ProductGrid category="men" type="shirt" limit={8} />

      <h3 className="text-center text-black font-semibold my-8">Jeans</h3>
      <ProductGrid category="men" type="jeans" limit={8} />

      <h3 className="text-center text-black font-semibold my-8">Joggers</h3>
      <ProductGrid category="men" type="jogger" limit={8} />

      <h3 className="text-center text-black font-semibold my-8">Shoes</h3>
      <ProductGrid category="men" type="shoe" limit={8} />

      <h4 className="text-center text-black my-8">
        Uh-Oh! We are <span className="text-[#f84258]">done</span>🛒
      </h4>
      <hr className="border-black w-3/4 mx-auto" />
      <br />
      <br />

      {/* Cart Section */}
      <div className="mx-5 md:mx-10">
        <h2 className="text-[#f84258] text-xl md:text-2xl font-bold mb-4">
          Your Cart
        </h2>
        <hr className="border-black w-32" />
        <br />

        <ul className="list-decimal pl-5">
          {cartItems.map((item, index) => (
            <li key={`${item.id}-${index}`} className="text-lg mb-2">
              {item.name} || Rs.{item.price}
            </li>
          ))}
        </ul>

        <button
          onClick={clearCart}
          className="mt-4 px-4 py-2 bg-transparent border-none cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <span className="text-[#f84258]">Clear My List</span>
        </button>
        <br />

        <small className="text-black block mt-4">
          Can't see anything? Click & add your favorite fashion in
          <span className="text-[#f84258]"> Shopping List!</span>
        </small>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}
