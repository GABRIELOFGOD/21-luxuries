"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import EmptyState from '@/app/components/EmptyState';
import PageLoader from '@/app/components/PageLoader';
import { motion } from "framer-motion";
import Link from "next/link";
import { IProduct } from "../models/Product";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   images: string[];
//   category: string;
//   description: string;
// }

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"createdAt" | "price" | "name">("createdAt");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchTerm.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, sortBy, sortOrder, minPrice, maxPrice, page, limit]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      const names = Array.isArray(data) ? data.map((c: any) => c.name).filter(Boolean) : [];
      setCategories(['all', ...Array.from(new Set(names))]);
    } catch (err) {
      console.warn('Category fetch error', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.set('limit', String(limit));
      params.set('page', String(page));
      params.set('sortBy', sortBy);
      params.set('sortOrder', sortOrder);

      if (selectedCategory !== 'all') {
        params.set('category', selectedCategory);
      }

      if (searchQuery) {
        params.set('search', searchQuery);
      }

      if (minPrice.trim() !== '') {
        params.set('minPrice', minPrice);
      }

      if (maxPrice.trim() !== '') {
        params.set('maxPrice', maxPrice);
      }

      const url = `/api/products?${params.toString().toLowerCase()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      setProducts(data.products || []);
      if (data.pagination) {
        setPagination(data.pagination);
      } else {
        setPagination((prev) => ({ ...prev, page, limit }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('createdAt');
    setSortOrder('desc');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
    setLimit(12);
  };

  const title = selectedCategory && selectedCategory !== 'all'
    ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
    : 'All Products';

  if (loading) return <PageLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => fetchProducts()} className="px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-opacity-90 transition-all">
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-[10vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{title}</h1>
          <p className="text-base md:text-lg text-foreground mt-1">Browse luxury items by search, category, price, and sort order.</p>
        </div>

        <section className="bg-white border border-border rounded-2xl p-4 md:p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="search" className="text-sm font-medium text-gray-700">Search</label>
              <input id="search" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name or description..." className="rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
              <select id="category" value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }} className="rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none">
                {loadingCategories ? <option>Loading...</option> : null}
                <option value="all">All categories</option>
                {categories.filter((c) => c !== 'all').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by</label>
              <select id="sort" value={`${sortBy}:${sortOrder}`} onChange={(e) => {
                const [field, order] = e.target.value.split(':') as ["createdAt" | "price" | "name", "desc" | "asc"];
                setSortBy(field);
                setSortOrder(order);
              }} className="rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none">
                <option value="createdAt:desc">Newest first</option>
                <option value="createdAt:asc">Oldest first</option>
                <option value="price:asc">Price: Low to high</option>
                <option value="price:desc">Price: High to low</option>
                <option value="name:asc">Name: A-Z</option>
                <option value="name:desc">Name: Z-A</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="minPrice" className="text-sm font-medium text-gray-700">Min price</label>
                <input id="minPrice" type="number" min={0} step={0.01} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" className="rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="maxPrice" className="text-sm font-medium text-gray-700">Max price</label>
                <input id="maxPrice" type="number" min={0} step={0.01} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="1000" className="rounded-lg border border-border px-4 py-2 focus:border-primary focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">{pagination.total} product{pagination.total === 1 ? '' : 's'} found</span>
            <button onClick={resetFilters} className="text-xs sm:text-sm px-4 py-2 rounded-lg border border-border bg-slate-100 text-slate-800 hover:bg-primary hover:text-white transition-colors">Clear filters</button>
          </div>
        </section>

        {products.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try widening your filters or search term, or check back later for new arrivals."
            icon="🛍️"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product, index) => (
                <motion.div key={product._id?.toString()} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.06 }} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/products/${product._id}`} className="block">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
                    <p className="text-sm text-foreground line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary">₦{product.price.toFixed(2)}</span>
                      <button className="bg-primary text-background px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">Add to Cart</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={!pagination.hasPrev} className="px-4 py-2 rounded-lg border border-border bg-white hover:bg-primary hover:text-white transition-colors disabled:opacity-40">Previous</button>
                <span>Page {pagination.page} of {pagination.pages}</span>
                <button onClick={() => setPage((prev) => (pagination.hasNext ? prev + 1 : prev))} disabled={!pagination.hasNext} className="px-4 py-2 rounded-lg border border-border bg-white hover:bg-primary hover:text-white transition-colors disabled:opacity-40">Next</button>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="limit" className="text-gray-600">Items per page</label>
                <select id="limit" value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="rounded-lg border border-border px-3 py-1.5 focus:border-primary focus:outline-none">
                  {[12, 24, 48].map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

