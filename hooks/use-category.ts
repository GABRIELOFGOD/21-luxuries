"use client";

import { useEffect, useState } from "react";

export const useCategory = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const category = await fetch('/api/dashboard/categories');
      if (!category.ok) throw new Error('Failed to fetch categories');
      const data = await category.json();
      setCategories(data.map((cat: any) => cat.name));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  return {
    categories,
  }
}