'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CloudinaryUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export default function CloudinaryUpload({ files, setFiles }: CloudinaryUploadProps) {
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      setError('');
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...newFiles]);
      setError('');
    }
  };

  const removeImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive
            ? 'border-primary bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-primary'
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          disabled={uploading}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        {uploading ? (
          <div className="space-y-4">
            <div className="text-4xl">⬆️</div>
            <p className="text-lg font-semibold text-primary">Uploading... {uploadProgress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
                className="h-2 bg-primary rounded-full"
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-4xl mb-2">📸</p>
            <p className="text-lg font-semibold text-gray-700">
              Drag images here or click to upload
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Upload multiple images at once (JPG, PNG, WebP)
            </p>
          </div>
        )}
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* File Preview Grid */}
      {files.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-primary mb-4">
            Selected Files ({files.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </motion.button>
                <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
