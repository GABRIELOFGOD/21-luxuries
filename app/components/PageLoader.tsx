'use client';

import { motion } from 'framer-motion';

interface PageLoaderProps {
  fullHeight?: boolean;
}

export default function PageLoader({ fullHeight = true }: PageLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex items-center justify-center ${fullHeight ? 'min-h-screen' : 'h-64'} bg-white`}
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mx-auto mb-6"
        >
          <svg
            className="w-16 h-16 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5.121 17.804A13.937 13.937 0 0112 16.5c3.746 0 7.285 1.289 10.121 3.304m-9.012-12.102a5.106 5.106 0 106.213.006M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a1 1 0 11-2 0 1 1 0 012 0zM5 20a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Loading...
        </h3>
        <p className="text-gray-600">Please wait while we fetch your data</p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-1 bg-primary rounded-full max-w-xs mx-auto mt-4"
        />
      </div>
    </motion.div>
  );
}
