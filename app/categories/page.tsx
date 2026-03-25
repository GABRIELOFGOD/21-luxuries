"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EmptyState from '@/app/components/EmptyState';
import PageLoader from '@/app/components/PageLoader';

interface CategoryDto {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Unable to load categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <PageLoader />;

  if (error) return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <p className="text-red-600 font-semibold">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          CATEGORIES
        </h1>
        <p className="text-lg text-foreground">
          Explore our luxury collections
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Create categories in dashboard and they will show up here with images."
          icon="📦"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 mb-16">
          {categories.map((category) => (
            <Link key={category._id} href={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`} className="group block">
              <article className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-80 w-full">
                  <Image
                    src={category.image || '/images/brand/default-category.png'}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 via-black/30 to-transparent">
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="mt-1 text-sm text-white/90 line-clamp-2">{category.description || 'Explore premium items in this category.'}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Featured Collections */}
      <div className="bg-primary py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
            FEATURED COLLECTIONS
          </h2>
          <p className="text-background text-lg">
            Discover our most exclusive pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
          <div className="text-center">
            <div className="bg-background rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-2">
                SUMMER ESSENTIALS
              </h3>
              <p className="text-foreground">
                Light, breezy pieces for the perfect summer
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-2">
                EVENING WEAR
              </h3>
              <p className="text-foreground">
                Elegant dresses and suits for special occasions
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-background rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-2">
                CASUAL CHIC
              </h3>
              <p className="text-foreground">
                Comfortable yet stylish everyday wear
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
