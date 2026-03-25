'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ICategory } from '@/app/models/Category';

// interface Category {
//   id: string;
//   name: string;
//   description?: string;
// }

export default function CategoryPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const uploadCategoryImage = async (): Promise<string | undefined> => {
    if (!categoryImageFile) return undefined;

    const formDataUpload = new FormData();
    formDataUpload.append('files', categoryImageFile);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formDataUpload,
    });

    if (!response.ok) {
      throw new Error('Category image upload failed');
    }

    const result = await response.json();
    return Array.isArray(result.urls) ? result.urls[0] : undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/dashboard/categories/${editingId}`
        : '/api/dashboard/categories';

      const imageUrl = await uploadCategoryImage();
      const payload = { ...formData, ...(imageUrl ? { image: imageUrl } : {}) };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to save category');

      setFormData({ name: '', description: '' });
      setCategoryImageFile(null);
      setCategoryImagePreview('');
      setEditingId(null);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category: ICategory) => {
    setFormData({ name: category.name, description: category.description || '' });
    setCategoryImagePreview(category.image || '');
    setCategoryImageFile(null);
    setEditingId(category._id.toString());
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/dashboard/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete category');
      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-2">Categories</h1>
        <p className="text-gray-600">Manage your product categories</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">
            {editingId ? 'Edit Category' : 'New Category'}
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Men's Clothing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Describe this category..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setCategoryImageFile(file);
                  setCategoryImagePreview(file ? URL.createObjectURL(file) : '');
                }}
                className="w-full text-sm text-gray-500 file:border-0 file:bg-primary file:text-background file:px-4 file:py-2 file:rounded-lg"
              />
              {categoryImagePreview && (
                <div className="mt-3 w-full max-w-45 h-30 rounded-lg overflow-hidden border border-gray-200">
                  <img src={categoryImagePreview} alt="Category Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-opacity-90 text-background px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Categories List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">All Categories ({categories.length})</h2>

          {categories.length > 0 ? (
            <div className="space-y-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category._id.toString()}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-primary">{category.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id.toString())}
                        className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {category.image && (
                    <div className="w-full h-40 rounded-lg overflow-hidden mb-2">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  {category.description && (
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No categories yet</p>
              <p className="text-gray-400 text-sm mt-1">Create one using the form on the left</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
