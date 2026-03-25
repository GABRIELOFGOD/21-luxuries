"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import EmptyState from '@/app/components/EmptyState';
import PageLoader from '@/app/components/PageLoader';
import Link from 'next/link';

interface ProductDetail {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product not found');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <PageLoader />;

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
        <EmptyState
          title="Product not found"
          description={error || 'The product may have been removed or is unavailable.'}
          icon="😕"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-[10vh]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <Link href="/products" className="text-sm text-primary hover:text-primary/80 font-semibold mb-4 inline-block">
          &larr; Back to catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
              <Image
                src={product.images[0] || '/placeholder.jpg'}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-105 md:h-140 object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {product.images.slice(0, 3).map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden h-24 bg-white shadow-sm">
                    <Image src={img} alt={`${product.name} ${i + 1}`} width={160} height={160} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-4">
              <span className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2">{product.name}</h1>
              <p className="text-xl font-bold text-secondary mt-3">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">{product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}</p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-opacity-90 transition-colors" disabled={product.stock <= 0}>
                Add to Cart
              </button>
              <Link href={`/products?category=${encodeURIComponent(product.category.toLowerCase())}`} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all">
                More in {product.category}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}