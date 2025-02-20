import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import CategoriesSkeleton from '../../components/LoadingScreen/CategoriesLoading'

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const subcategoriesRef = useRef(null) 

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
    select: (data) => data.data.data,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: 5000
  })

  const { data: subcategories, isLoading: isSubLoading, error: subError } = useQuery({
    queryKey: ['subcategories', selectedCategory],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${selectedCategory}`),
    select: (data) => data.data.data,
    enabled: !!selectedCategory, 
  })

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    setTimeout(() => {
      subcategoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300) 
  }

  if (isLoading) return <CategoriesSkeleton />

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Product Categories
        </h1>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Failed to load categories
            </h2>
            <p className="text-red-700 mb-4">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {data?.map((category) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCategoryClick(category._id)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-semibold text-white tracking-wide">
                    {category.name}
                  </h3>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
                    View Subcategories
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!error && !data?.length && (
          <div className="text-center py-12 text-gray-500">
            No categories found
          </div>
        )}

        {/* Subcategories Section */}
        {selectedCategory && (
          <div ref={subcategoriesRef} className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Subcategories
            </h2>

            {isSubLoading ? (
              <p className="text-center text-gray-600">Loading subcategories...</p>
            ) : subError ? (
              <p className="text-center text-red-600">Error: {subError.message}</p>
            ) : subcategories?.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {subcategories.map((sub) => (
                  <motion.div
                    key={sub._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-white rounded-lg shadow-md text-center"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {sub.name}
                    </h3>
                    <p className="text-gray-600">Slug: {sub.slug}</p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-gray-600">No subcategories available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
